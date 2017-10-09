import React, { Component } from 'react';
import Day from './day';
import _ from 'lodash';

export default class DayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  renderDays() {
    const { days, meals } = this.props;

    return _.map(days, (day) => {
      return(
        <Day key={day.id} day={day} />
      );
    });
  }

  handleClick() {
    this.setState( (this.state.open === true) ? { open: false } : { open: true });
  }

  renderList() {
    if(this.state.open) {
      return (
        <div className="day-nav-container">
          <ul className="day-nav">
            {this.renderDays()}
          </ul>
          <i className="fa fa-window-close-o close-day-nav" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>
        </div>
      );
    } else {
      return(<i className="fa fa-angle-double-right open-day-nav" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>);
    }
  }

  render() {
    return(
      <div className="day-list">
        {this.renderList()}
      </div>
    );
  }
}
