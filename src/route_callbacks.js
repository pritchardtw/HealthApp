import React from 'react';
import { store } from './store';
import { fetchMeals } from './actions';
import Meals from './components/meals';
import DetailedMeal from './components/detailed_meal';

export function onMealsEnter(props) {
  store.dispatch(fetchMeals());
  return <Meals {...props} />;
}
