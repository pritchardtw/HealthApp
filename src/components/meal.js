import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Meal extends Component {
  render() {
    return(
      <NavLink className="meal" activeClassName="active-nav" to={`/meals/${this.props.meal.id}`}>
        <li key={this.props.meal.id}>
          {this.props.meal.name}
          <span className="meal-span"> C/I/I </span>
        </li>
      </NavLink>
    );
  }
}
