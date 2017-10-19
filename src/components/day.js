import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { showMealList } from '../route_callbacks';
import MealList from './meal_list';
import _ from 'lodash';

export default class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick() {
    this.setState( (this.state.open === true) ? { open: false } : { open: true });
  }

  renderMealList() {
    if(this.state.open) {
      return (<MealList day_index={this.props.index} meal_ids={this.props.day.meal_ids} completed={false}/>);
    } else {
      return null;
    }
  }

  renderSpan() {
    let j = 0;
    _.map(this.props.day.completed, (completed) => {
      if(completed) {
        j++;
      }
    });
    if(j == 3) {
      return (<i className="fa fa-check" aria-hidden="true"></i>)
    } else {
      return (<i className="fa fa-circle-thin" aria-hidden="true"></i>)
    }
  }

  render() {
    return(
        <div className="day">
          <li onClick={this.handleClick.bind(this)}>
            Day {this.props.index}
            {this.renderSpan()}
          </li>
          {this.renderMealList()}
        </div>
    );
  }
}
