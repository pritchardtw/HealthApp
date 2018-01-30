import { initAuth as initAuthAction } from '../actions/action_auth';
import { firebaseAuth } from '../firebase/firebase';

export function initAuth(dispatch) {
  firebaseAuth.useDeviceLanguage();
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        dispatch(initAuthAction(authUser, dispatch));
        unsubscribe();
        resolve();
      },
      error => reject(error)
    );
  });
}
