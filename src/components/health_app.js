import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import DetailedMeal from './detailed_meal';
import DayList from './day_list';
import { onDetailedMealEnter } from '../route_callbacks';
import { firebaseAuth } from '../firebase/firebase';

class HealthApp extends Component {

  render() {
    let user = firebaseAuth.currentUser;
    if(this.props.days) {
      const { match } = this.props;

      return (
        <div className="health-app">
          <DayList days={this.props.days} />
          <Switch>
            <Route path={`${match.url}/:meal_index/:id`} component={DetailedMeal}/>
            <Route path={match.url} render={() => {
              if(user) {
                return (<h3 className="welcome-message">Welcome to the program {user.displayName}</h3>);
              } else {
                return (<h3 className="welcome-message">Welcome to the program.</h3>);
              }
            }}/>
          </Switch>
        </div>
      );
    } else {
      return(
        <h3>loading...</h3>
      );
    }
  }
}

const mapStateToProps = ({ days, auth }) => {
  return { days, auth };
}

export default connect(mapStateToProps)(HealthApp);
