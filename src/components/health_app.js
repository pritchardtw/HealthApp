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
          <Route exact path={match.url} render={() => (
            <h3>Welcome to the program.</h3>
          )}/>
        </div>
      );
    } else {
      console.log("returning loading");
      return(
        <h3>loading...</h3>
      );
    }
  }
}

const mapStateToProps = ({ days }) => {
  return { days };
}

export default connect(mapStateToProps)(HealthApp);
