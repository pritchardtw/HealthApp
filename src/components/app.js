import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBar from './menu_bar';
import HealthApp from './health_app';
import GroceryList from './grocery_list';
import About from './about';
import Snacks from './snacks';
import Checkout from './stripe/checkout';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return(
        <div className="app">
          <MenuBar {...this.props} />
          <ReactCSSTransitionGroup
              transitionName="fade-in"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
              transitionAppear={true}
              transitionAppearTimeout={250}>
            <Switch>
              <Route path={`${this.props.match.url}/grocery_list`} component={GroceryList}/>
              <Route path={`${this.props.match.url}/about`} component={About}/>
              <Route path={`${this.props.match.url}/snacks`} component={Snacks}/>
              <Route path={`${this.props.match.url}/health`} component={Checkout}/>
              <Route path={this.props.match.url} component={HealthApp}/>
            </Switch>
          </ReactCSSTransitionGroup>
        </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(App);
