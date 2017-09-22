import React from 'react';
import { store } from './store';
import { fetchDays } from './actions';
import { fetchMeals } from './actions';
import App from './components/app';
import DetailedMeal from './components/detailed_meal';

export function onAppEnter(props) {
  store.dispatch(fetchDays());
  store.dispatch(fetchMeals());
  return <App {...props} />;
}

export function onMealSelected(props) {
  store.dispatch(fetchMeals());
  return <DetailedMeal {...props} />;
}
