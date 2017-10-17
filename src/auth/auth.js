import * as actions from '../actions';
import { firebaseAuth } from '../firebase/firebase';

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(actions.initAuth(authUser));
        unsubscribe();
        resolve();
      },
      error => reject(error)
    );
  });
}
