import React, { Component } from 'react';
import Day from './day';
import _ from 'lodash';

export default class DayList extends Component {

  renderDays() {
    const { days, meals } = this.props;

    return _.map(days, (day) => {
      return(
        <Day key={day.id} day={day} />
      );
    });
  }

  render() {
    return(
      <div className="day-list">
        <ul className="nav navbar-nav">
          {this.renderDays()}
        </ul>
      </div>
    );
  }
}
