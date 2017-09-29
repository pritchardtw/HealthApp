import React from 'react';
import { store } from './store';
import { fetchDays } from './actions';
import { fetchMeals } from './actions';
import HealthApp from './components/health_app';
import DetailedMeal from './components/detailed_meal';

export function onHealthAppEnter(props) {
  console.log("on health app enter called");
  store.dispatch(fetchDays());
  store.dispatch(fetchMeals());
  return <HealthApp {...props} />;
}

export function onDetailedMealEnter(props) {
  console.log("on meal selected called");
  return <DetailedMeal {...props} />;
}
