import { firebaseDb } from '../firebase/firebase';

export const UPDATE_PROGRESS = 'update_progress';

export function subscribeProgress(user, dispatch) {
  return firebaseDb.collection('progress').doc(user.uid)
    .onSnapshot((doc) => {
      if(doc.exists) {
        dispatch({
          type: UPDATE_PROGRESS,
          payload: doc.data()
        });
      }
    });
}
