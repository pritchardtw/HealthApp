import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import DetailedMeal from './detailed_meal';
import DayList from './day_list';

class HealthApp extends Component {

  render() {

    const { match } = this.props;

    return (
      <div className="health-app">
        <DayList days={this.props.days} />
        <Route path={`${match.url}/:id`} component={DetailedMeal}/>
        <Route exact path={match.url} render={() => (
          <h3>Welcome to the program.</h3>
        )}/>
      </div>
    );
  }
}

const mapStateToProps = ({ days }) => {
  return { days };
}

export default connect(mapStateToProps)(HealthApp);
