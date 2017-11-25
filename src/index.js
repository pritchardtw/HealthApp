import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { onAppEnter, onHomeEnter } from './route_callbacks';
import { firebaseAuth } from './firebase/firebase';
import { initAuth } from './auth/auth';
import { StripeProvider } from 'react-stripe-elements';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_DGUtMmvqAKEdKAWHv1boXPXA">
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/app" render={onAppEnter} />
              <Route path="/" render={onHomeEnter} />
            </Switch>
          </div>
        </BrowserRouter>
      </StripeProvider>
    </Provider>
    , document.querySelector('.initial-container'));
}

initAuth(store.dispatch)
  .then(() => {
    render();
  })
  .catch(error => {
    console.error(error);
  });
