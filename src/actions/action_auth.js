import axios from 'axios';
import { firebaseAuth, firebaseDb } from '../firebase/firebase';
import firebase from 'firebase/app';
import { subscribePurchases } from './action_purchase_plan';
import { subscribeProgress } from './action_progress';

export const LOGGED_IN = 'logged_in';
export const LOGGED_OUT = 'logged_out';

let unsubscribeProgress; // gets initialized at login.
let unsubscribePurchases;

export function initAuth(user, dispatch) {
  if(user) {
    return (dispatch) => {
      initSubscriptions(user, dispatch)
      .then(() => {
        dispatch({
          type: LOGGED_IN,
          payload: user
        });
      });
    }
  } else {
    dispatch({
      type: UPDATE_PROGRESS,
      payload: {}
    });
    dispatch({
      type: PRO_PURCHASED,
      payload: false
    });
    return({
      type: LOGGED_OUT
    });
  }
}

function loginWithProvider(provider) {
  return (dispatch) => {
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebaseAuth.signInWithPopup(provider)
      .then((response) => {
        dispatch(initAuth(response.user, dispatch));
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  return loginWithProvider(provider);
}

export function loginWithFacebook() {
  let provider = new firebase.auth.FacebookAuthProvider();
  return loginWithProvider(provider);
}

export function loginWithEmailAndPassword(email, password) {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch(initAuth(response, dispatch));
    })
    .catch((error) => {
        console.log(error.message);
    });
  }
}

export function signUpWithEmailAndPassword(email, password) {
  console.log("Sign Up", email, password);
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch(initAuth(response, dispatch));
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
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
      console.log(err.message);
    });
  };
}

function initSubscriptions(user, dispatch) {
  return new Promise((resolve, reject) => {
    console.log("in init subscriptions");
    unsubscribePurchases = subscribePurchases(user, dispatch);
    unsubscribeProgress = subscribeProgress(user, dispatch);
    resolve();
  });
}
