import axios from 'axios';
export const FETCH_DAYS = 'fetch_days';
export const FETCH_MEALS = 'fetch_meals';
export const LOGGED_IN = 'logged_in';

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
      console.log("caught error");
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
      console.log("caught error");
    });
  }
}

export function loginWithGoogle(callback) {
  return (dispatch) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
    .then(response => {
      dispatch({
        type: LOGGED_IN,
        payload: response
      });
      //callback directs to app page.
      callback();
    })
    .catch(err => {
      console.log("caught error", err);
    });
  };
}
