import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import App from './components/app';
import { store } from './store';
import { onHomeEnter } from './route_callbacks';
import { LOGGED_IN, LOGGED_OUT } from './actions';
import { firebaseAuth } from './firebase/firebase';
import { initAuth } from './auth/auth';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/app" component={App} />
            <Route path="/" render={onHomeEnter}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    , document.querySelector('.initial-container'));
}

initAuth(store.dispatch)
  .then(() => render())
  .catch(error => console.error(error));
