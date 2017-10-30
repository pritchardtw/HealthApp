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

    return _.map(days, (day, index) => {
      return(
        <Day key={index} index={index} day={day} {...this.props} />
      );
    });
  }

  renderArrow() {
    if(this.state.open === true) {
      return <i className="fa fa-angle-double-left" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>
    } else {
      return <i className="fa fa-angle-double-right" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>
    }
  }

  handleClick() {

    if(this.state.open === true) {
      $('.day-nav').stop().animate({'left': '-93%'}, 500, () => {
        $('.day-list').stop().animate({'width': '20px', 'min-width': '0px'}, 100);
      });
    } else {
      $('.day-list').stop().animate({'width': '30%', 'min-width': '200px'}, 100, () => {
        $('.day-nav').stop().animate({'left': '0'}, 500);
      });
    }
    this.setState((this.state.open === true) ? { open: false } : { open: true });
  }

  renderList() {
    return (
        <ul className="day-nav">
          {this.renderDays()}
        </ul>
    );
  }

  render() {
    return(
      <div className="day-list">
        {this.renderList()}
        {this.renderArrow()}
      </div>
    );
  }
}
