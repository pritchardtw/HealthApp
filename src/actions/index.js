import axios from 'axios';
import { firebaseAuth, firebaseDb } from '../firebase/firebase';
import firebase from 'firebase/app';
export const FETCH_DAYS = 'fetch_days';
export const FETCH_MEALS = 'fetch_meals';
export const LOGGED_IN = 'logged_in';
export const LOGGED_OUT = 'logged_out';


const ROOT_URL = 'http://localhost:3090';

// const API_KEY = '?key=thommywhommy'

  // function getDays() {
  //   return [
  //     {
  //       id: 1,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 2,
  //       meal_ids: [4, 5, 6]
  //     },
  //     {
  //       id: 3,
  //       meal_ids: [6, 5, 4]
  //     },
  //     {
  //       id: 4,
  //       meal_ids: [3, 2, 1]
  //     },
  //     {
  //       id: 5,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 6,
  //       meal_ids: [4, 5, 6]
  //     },
  //     {
  //       id: 7,
  //       meal_ids: [6, 5, 4]
  //     },
  //     {
  //       id: 8,
  //       meal_ids: [3, 2, 1]
  //     },
  //     {
  //       id: 9,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 10,
  //       meal_ids: [4, 5, 6]
  //     },
  //     {
  //       id: 11,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 12,
  //       meal_ids: [4, 5, 6]
  //     },
  //     {
  //       id: 13,
  //       meal_ids: [6, 5, 4]
  //     },
  //     {
  //       id: 14,
  //       meal_ids: [3, 2, 1]
  //     },
  //     {
  //       id: 15,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 16,
  //       meal_ids: [4, 5, 6]
  //     },
  //     {
  //       id: 17,
  //       meal_ids: [6, 5, 4]
  //     },
  //     {
  //       id: 18,
  //       meal_ids: [3, 2, 1]
  //     },
  //     {
  //       id: 19,
  //       meal_ids: [1, 2, 3]
  //     },
  //     {
  //       id: 20,
  //       meal_ids: [4, 5, 6]
  //     }
  //   ];
  // }
  //
  // function getMeals() {
  //   return [
  //     {
  //       id: 1,
  //       name: "Potatoes",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     },
  //     {
  //       id: 2,
  //       name: "Apples",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     },
  //     {
  //       id: 3,
  //       name: "Kale",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     },
  //     {
  //       id: 4,
  //       name: "Cauliflower",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     },
  //     {
  //       id: 5,
  //       name: "Dates",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     },
  //     {
  //       id: 6,
  //       name: "Squash",
  //       ingredients: ["Potatoes", "More potatoes"],
  //       preparation: "Cook Potatoes",
  //       video_id: "atj_WlIfzZg",
  //       substitutions: "alternate potatoes"
  //     }
  //   ];
  // }

export function fetchDays() {
  return function getDays(dispatch) {
    axios.get(`${ROOT_URL}/days`)
    .then(response => {
      dispatch({
        type: FETCH_DAYS,
        payload: response
      });
    })
    .catch(() => {
      console.error("caught error");
    });
  }
}

export function fetchMeals() {

  return function getMeals(dispatch) {
    axios.get(`${ROOT_URL}/meals`)
    .then(response => {
      dispatch({
        type: FETCH_MEALS,
        payload: response
      });
    })
    .catch(() => {
      console.error("caught error");
    });
  }
}

export function initAuth(user) {
  if(user) {
    return ({
      type: LOGGED_IN,
      payload: user
    });
  } else {
    return({
      type: LOGGED_OUT
    });
  }
}

export function loginWithGoogle(callback) {
  return (dispatch) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebaseAuth.signInWithPopup(provider)
      .then((response) => {
        firebaseDb.collection('progress').doc(response.user.uid).set({progress : new Array(30).fill(false)})
        .then(() => {
          console.log("Document Written")
          firebaseDb.collection('progress').doc(response.user.uid).get()
          .then((doc) => {
            console.log("doc", doc.data());
          });
          dispatch({
            type: LOGGED_IN,
            payload: response.user
          });
          //callback directs to app page.
          callback();
        })
        .catch((err) => {
          console.error("Error writing document", err);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
  };
}

export function logout(callback) {
  return (dispatch) => {
    firebaseAuth.signOut()
    .then(() => {
      dispatch({
        type: LOGGED_OUT,
      });
      callback();
    })
    .catch((err) => {
      console.error(err.message);
    });
  };
}
