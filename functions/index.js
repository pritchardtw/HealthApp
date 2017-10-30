// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token),
      currency = functions.config().stripe.currency || 'USD';

// [START chargecustomer]
// Charge the Stripe customer whenever an amount is written to the Firestore database
exports.createStripeCharge = functions.firestore.document('/customers/{userId}/charges/{id}').onCreate(event => {
  const val = event.data.data();
  // This onWrite will trigger whenever anything is written to the path, so
  // noop if the charge was deleted, errored out, or the Stripe API returned a result (id exists)
  if (val === null || val.id || val.error) return null;
  // Look up the Stripe customer id written in createStripeCustomer
  // Create a charge using the pushId as the idempotency key, protecting against double charges
  const amount = val.amount;
  // const idempotency_key = event.params.id;
  const description = "True Health Pro";
  let charge = {amount, currency, description};
  if (val.source !== null) charge.source = val.source;
  return stripe.charges.create(charge, (err, charge) => {
    if(err) {
      console.log("Stripe Create Charge Error:", err.message);
      const timestamp = new Date().getTime();
      admin.firestore().collection('customers').doc(event.params.userId).collection('products').doc('pro').set({ purchased: true }, {merge: true});
      return event.data.ref.set({ error: err.message, timestamp});
    } else if(charge) {
      console.log("Charge created", charge);
      const timestamp = new Date().getTime();
      charge.timestamp = timestamp;
      event.data.ref.set(charge)
      .then(result => {
        console.log("set charge result", result);
        admin.firestore().collection('customers').doc(event.params.userId).collection('products').doc('pro').set({ purchased: true }, {merge: true});
      });
    }
  });
});
// [END chargecustomer]]
