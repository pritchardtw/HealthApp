// import axios from 'axios';
import _ from 'lodash';
export const FETCH_MEALS = 'fetch_meals';
export const MEAL_SELECTED = 'meal_selected';

// const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
// const API_KEY = '?key=thommywhommy'

  function getMealList() {
    return [
      {
        id: 1,
        name: "apples",
        ingredient: "apples",
        preparation: "wash apples",
        substitutions: "pears"
      },
      {
        id: 2,
        name: "kale",
        ingredient: "kale, salt, pepper",
        preparation: "cook kale",
        substitutions: "spinach"
      },
      {
        id: 3,
        name: "cauliflower",
        ingredient: "cauliflower",
        preparation: "cook cauliflower",
        substitutions: "broccoli"
      }
    ];
  }

export function fetchMeals() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  const request = getMealList();

  return {
    type: FETCH_MEALS,
    payload: request
  };
}

export function mealSelected(id) {

  const request = getMealList();

  const meals = _.mapKeys(request, 'id');

  return {
    type: MEAL_SELECTED,
    payload: meals[id]
  };
}
