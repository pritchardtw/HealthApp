import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { showMealList } from '../route_callbacks';
import MealList from './meal_list';

export default class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentWillMount() {
    console.log("Day will mount");
  }

  handleClick() {
    this.setState( (this.state.open === true) ? { open: false } : { open: true });
  }

  renderMealList() {
    if(this.state.open) {
      return (<MealList meal_ids={this.props.day.meal_ids}/>);
    } else {
      return null;
    }
  }

  render() {
    return(
        <div key={this.props.day.id} className="day">
          <li key={this.props.day.id} onClick={this.handleClick.bind(this)}>
            Day {this.props.day.id}
            <span className="day-span"> icon </span>
          </li>
          {this.renderMealList()}
        </div>
    );
  }
}
