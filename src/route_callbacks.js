import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { fetchDays } from './actions';
import { fetchMeals } from './actions';
import HealthApp from './components/health_app';
import DetailedMeal from './components/detailed_meal';
import Home from './components/home';
import { firebaseAuth } from './firebase/firebase';

export function onHealthAppEnter(props) {
  store.dispatch(fetchDays());
  store.dispatch(fetchMeals());
  return <HealthApp {...props} />;
}

export function onDetailedMealEnter(props) {
  return <DetailedMeal {...props} />;
}

export function onHomeEnter(props) {
  if(firebaseAuth.currentUser) {
    return <Redirect to='/app' />;
  } else {
    return <Home {...props} />;
  }
}
