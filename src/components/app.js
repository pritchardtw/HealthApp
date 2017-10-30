import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBar from './menu_bar';
import HealthApp from './health_app';
import GroceryList from './grocery_list';
import About from './about';
import Snacks from './snacks';
import Checkout from './stripe/checkout';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { onHealthAppEnter } from '../route_callbacks';
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
              <Route path={`${this.props.match.url}/grocery_list`} render={()=>{return <GroceryList {...this.props}/>}}/>
              <Route path={`${this.props.match.url}/about`} render={()=>{return <About {...this.props}/>}}/>
              <Route path={`${this.props.match.url}/snacks`} render={()=>{return <Snacks {...this.props}/>}}/>
              <Route path={`${this.props.match.url}/health`} render={()=>{return <Checkout {...this.props} />}}/>
              <Route path={this.props.match.url} render={onHealthAppEnter}/>
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
