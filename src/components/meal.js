import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { showDetailedMeal } from '../route_callbacks';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Meal extends Component {

  renderSpan() {
    const { completed } = this.props;

    if(completed) {
      return (<i className="fa fa-check" aria-hidden="true"></i>)
    } else {
      return (<i className="fa fa-circle-thin" aria-hidden="true"></i>)
    }
  }

  render() {
    const { meal } = this.props;

    return(
        <NavLink className="meal" activeClassName="active-nav" to={`/app/${meal.id}`}>
          <li key={meal.id}>
            {meal.name}
            {this.renderSpan()}
          </li>
        </NavLink>
    );
  }
}

const mapStateToProps = ({ meals }, ownProps) => {
  return { meal: meals[ownProps.id] };
}

export default connect(mapStateToProps)(Meal);
