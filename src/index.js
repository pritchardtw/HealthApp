import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import DetailedMeal from './components/detailed_meal';
import Meals from './components/meals';
import { store } from './store';
import { onMealsEnter } from './route_callbacks';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/meals" render={onMealsEnter} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.initial-container'));
