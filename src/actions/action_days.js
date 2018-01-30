import axios from 'axios';
import { firebaseAuth, firebaseDb } from '../firebase/firebase';
import firebase from 'firebase/app';

export const FETCH_DAYS = 'fetch_days';

export function fetchDays() {
  return function getDays(dispatch) {
    firebaseDb.collection("days").get()
    .then((querySnapshot) => {
      let result = {};
      querySnapshot.forEach((doc) => {
          result[doc.id] = doc.data();
      });
      console.log("dispatching fetch days");
      dispatch({
        type: FETCH_DAYS,
        payload: result
      });
    })
    .catch((err) => {
      console.log(err);
    });

    // axios.get(`${ROOT_URL}/days`)
    // .then(response => {
    //   dispatch({
    //     type: FETCH_DAYS,
    //     payload: response
    //   });
    // })
    // .catch(() => {
    //   console.error("caught error");
    // });
  }
}

// function populateDays() {
//   for(let i = 1; i < 31; i++) {
//     console.log("populating day", i);
//     if(i % 2) {
//       firebaseDb.collection('days').doc('' + i).set({ meal_ids : [1,2,3] });
//     } else {
//       firebaseDb.collection('days').doc('' + i).set({ meal_ids : [4,5,6] });
//     }
//   }
// }
