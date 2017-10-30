import * as actions from '../actions';
import { firebaseAuth } from '../firebase/firebase';

export function initAuth(dispatch) {
  firebaseAuth.useDeviceLanguage();
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(actions.initAuth(authUser, dispatch));
        unsubscribe();
        resolve();
      },
      error => reject(error)
    );
  });
}
