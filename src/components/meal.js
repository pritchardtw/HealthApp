import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { showDetailedMeal } from '../route_callbacks';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Meal extends Component {

  render() {
    const { meal } = this.props;

    return(
        <NavLink className="meal" activeClassName="active-nav" to={`/app/${meal.id}`}>
          <li key={meal.id}>
            {meal.name}
            <span className="meal-span"> icon </span>
          </li>
        </NavLink>
    );
  }
}

const mapStateToProps = ({ meals }, ownProps) => {
  return { meal: meals[ownProps.id] };
}

export default connect(mapStateToProps)(Meal);
