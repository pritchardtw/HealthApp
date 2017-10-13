import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import DetailedMeal from './detailed_meal';
import DayList from './day_list';
import { onHealthAppEnter, onDetailedMealEnter } from '../route_callbacks';

class HealthApp extends Component {

  render() {

    if(this.props.days) {
      const { match } = this.props;

      return (
        <div className="health-app">
          <DayList days={this.props.days} />
          <Route path={`${match.url}/:id`} render={onDetailedMealEnter}/>
          <Route exact path={match.url} render={() => {
            if(this.props.auth.auth) {
              return (<h3>Welcome to the program {this.props.auth.user.profile.name}</h3>);
            } else {
              return (<h3>Welcome to the program.</h3>);
            }
          }}/>
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
