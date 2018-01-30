import { firebaseAuth, firebaseDb } from '../firebase/firebase';

export const PRO_PURCHASED = 'pro_purchased';
export const PRO_PURCHASE_PROCESSING = 'pro_purchase_processing';
export const PRO_PURCHASE_ERROR = 'pro_purchase_error';

//Purchase pro plan.
export function purchasePro(token, callback) {
  return (dispatch) => {
    console.log("purchasePro", token);
    let uid = firebaseAuth.currentUser.uid;
    firebaseDb.collection('customers').doc(uid).collection('charges').add({source: token.id, amount: 1000})
    .then((doc) => {
        //write the doc then listen for charge completion.
        let unsubscribeCharge = firebaseDb.collection('customers').doc(uid).collection('charges').doc(doc.id).onSnapshot((doc) => {
        const docData = doc.data();
        console.log("docData", docData);
        if(docData.error) {
          console.log("error in charge", docData.error)
          unsubscribeCharge();
          dispatch({
            type: PRO_PURCHASE_ERROR,
            payload: doc.id
          });
        } else if(docData.charge) {
          console.log("charged", docData.charge)
          unsubscribeCharge();
        }
      });
      dispatch({
        type: PRO_PURCHASE_PROCESSING,
        payload: doc.id
      });
      callback();
    });
  }
}

// Subscribes to purchase changes and returns a function to unsubscribe
// called at logout.
export function subscribePurchases(user, dispatch) {
  return firebaseDb.collection('customers').doc(user.uid).collection('products').doc('pro')
          .onSnapshot((doc) => {
            if(doc.exists) {
              console.log("dispatching pro purchased", doc.data().purchased);
              dispatch({
                type: PRO_PURCHASED,
                payload: doc.data().purchased
              });
            } else {
              console.log("dispatching pro purchased false");
              dispatch({
                type: PRO_PURCHASED,
                payload: false
              });
            }
          });
}
