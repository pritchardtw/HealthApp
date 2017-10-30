import axios from 'axios';
import { firebaseAuth, firebaseDb } from '../firebase/firebase';
import firebase from 'firebase/app';
export const FETCH_DAYS = 'fetch_days';
export const FETCH_MEALS = 'fetch_meals';
export const MEAL_SELECTED = 'meal_selected';
export const LOGGED_IN = 'logged_in';
export const LOGGED_OUT = 'logged_out';
export const UPDATE_PROGRESS = 'update_progress';
export const PURCHASED_PRO = 'purchased_pro';

const ROOT_URL = 'http://localhost:3090';

// const API_KEY = '?key=thommywhommy'
let unsubscribeProgress; // gets initialized at login.
let unsubscribePurchases;

export function fetchDays() {
  return function getDays(dispatch) {
    firebaseDb.collection("days").get()
    .then((querySnapshot) => {
      let result = {};
      querySnapshot.forEach((doc) => {
          result[doc.id] = doc.data();
      });
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

export function initAuth(user, dispatch) {
  if(user) {
    unsubscribeProgress = firebaseDb.collection("progress").doc(user.uid)
    .onSnapshot((doc) => {
      if(doc.exists) {
        dispatch({
          type: UPDATE_PROGRESS,
          payload: doc.data()
        });
      }
    });
    unsubscribePurchases = firebaseDb.collection('customers').doc(user.uid).collection('products').doc('pro')
    .onSnapshot((doc) => {
      if(doc.exists) {
        dispatch({
          type: PURCHASED_PRO,
          payload: doc.data()
        })
      }
    })
    return ({
      type: LOGGED_IN,
      payload: user
    });
  } else {
    dispatch({
      type: UPDATE_PROGRESS,
      payload: {}
    });
    return({
      type: LOGGED_OUT
    });
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

function loginWithProvider(provider, callback) {
  return (dispatch) => {
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebaseAuth.signInWithPopup(provider)
      .then((response) => {
        dispatch(initAuth(response.user, dispatch));
        //callback directs to app page.
        callback();
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
  }
}

export function loginWithGoogle(callback) {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  return loginWithProvider(provider, callback);
}

export function loginWithFacebook(callback) {
  let provider = new firebase.auth.FacebookAuthProvider();
  return loginWithProvider(provider, callback);
}

export function loginWithEmailAndPassword(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch((error) => {
    // Handle Errors here.
    console.log(error);
  });
}

export function logout(callback) {
  return (dispatch) => {
    unsubscribeProgress();
    unsubscribePurchases();
    firebaseAuth.signOut()
    .then(() => {
      dispatch(initAuth(null, dispatch));
      callback();
    })
    .catch((err) => {
      console.error(err.message);
    });
  };
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

export function purchasePro(token) {
  return () => {
    console.log("purchasePro", token);
    let uid = firebaseAuth.currentUser.uid;
    firebaseDb.collection('customers').doc(uid).collection('charges').add({source: token.id, amount: 1000});
  }
}
