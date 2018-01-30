import axios from 'axios';
import { firebaseAuth, firebaseDb } from '../firebase/firebase';
import firebase from 'firebase/app';

export const FETCH_MEALS = 'fetch_meals';

export function fetchMeals() {
  return function getMeals(dispatch) {
    firebaseDb.collection('meals').get()
    .then((querySnapshot) => {
      let result = {};
      querySnapshot.forEach((doc) => {
        result[doc.id] = doc.data();
      });
      dispatch({
        type: FETCH_MEALS,
        payload: result
      })
    })
    .catch((err) => {
      console.log(err);
    });
    // axios.get(`${ROOT_URL}/meals`)
    // .then(response => {
    //   dispatch({
    //     type: FETCH_MEALS,
    //     payload: response
    //   });
    // })
    // .catch(() => {
    //   console.error("caught error");
    // });
  }
}

export function mealCompleted(values, meal_index) {
  return () => {
    let uid = firebaseAuth.currentUser.uid;
    let progressObject = {};
    progressObject[meal_index] = { completed : true, values };
    firebaseDb.collection('progress').doc(uid).set(progressObject, { merge: true })
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export function mealIncomplete(meal_index) {
  return () => {
    let uid = firebaseAuth.currentUser.uid;
    let progressObject = {};
    progressObject[meal_index] = { completed : false };
    firebaseDb.collection('progress').doc(uid).set(progressObject, { merge: true })
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

// function populateMeals() {
//   console.log("populating");
//   firebaseDb.collection('meals').doc('' + 1)
//   .set({ name: "kale",
//          ingredients: ["kale", "more kale"],
//          preparation: "cook the kale!",
//          video_id: "atj_WlIfzZg",
//          substitutions: "not kale"
//        });
//
//   firebaseDb.collection('meals').doc('' + 2)
//   .set({ name: "sweet potatoes",
//         ingredients: ["yams", "more yams"],
//         preparation: "cook the yams!",
//         video_id: "atj_WlIfzZg",
//         substitutions: "not yams"
//       });
//
//   firebaseDb.collection('meals').doc('' + 3)
//   .set({ name: "brussel sprouts",
//         ingredients: ["sprouts", "more sprouts"],
//         preparation: "cook the brussels!",
//         video_id: "atj_WlIfzZg",
//         substitutions: "not sprouts!"
//       });
//
//   firebaseDb.collection('meals').doc('' + 4)
//   .set({ name: "carrots",
//         ingredients: ["carrots", "more carrots"],
//         preparation: "cook the carrots!",
//         video_id: "atj_WlIfzZg",
//         substitutions: "not carrots"
//       });
//
//   firebaseDb.collection('meals').doc('' + 5)
//   .set({ name: "broccoli",
//         ingredients: ["green broccoli", "more green broccoli"],
//         preparation: "cook the broccoli!",
//         video_id: "atj_WlIfzZg",
//         substitutions: "not broccoli"
//       });
//
//   firebaseDb.collection('meals').doc('' + 6)
//   .set({ name: "cauliflower",
//         ingredients: ["white cauliflower", "more white cauliflower"],
//         preparation: "cook the cauliflower!",
//         video_id: "atj_WlIfzZg",
//         substitutions: "not cauliflower"
//       });
// }
