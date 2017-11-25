import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { fetchDays } from './actions';
import { fetchMeals } from './actions';
import App from './components/app';
import Home from './components/home';
import { firebaseAuth } from './firebase/firebase';

export function onAppEnter(props) {
  store.dispatch(fetchDays());
  store.dispatch(fetchMeals());
  return <App {...props} />;
}

export function onHomeEnter(props) {
  if(firebaseAuth.currentUser) {
    return <Redirect to='/app' />;
  } else {
    return <Home {...props} />;
  }
}
