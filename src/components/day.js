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
      return (<MealList meal_ids={this.props.day.meal_ids} completed={this.props.day.completed}/>);
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
        <div key={this.props.day.id} className="day">
          <li key={this.props.day.id} onClick={this.handleClick.bind(this)}>
            Day {this.props.day.id}
            {this.renderSpan()}
          </li>
          {this.renderMealList()}
        </div>
    );
  }
}
