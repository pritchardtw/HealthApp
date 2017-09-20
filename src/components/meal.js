import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { showDetailedMeal } from '../route_callbacks';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Meal extends Component {

  componentWillMount() {
    console.log("Meal will mount");
  }

  render() {
    const { meal } = this.props;

    return(
      <ReactCSSTransitionGroup
          transitionName="expand"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
          transitionAppear={true}
          transitionAppearTimeout={250}>
      <NavLink className="meal" activeClassName="active-nav" to={`/app/${meal.id}`}>
        <li key={meal.id}>
          {meal.name}
          <span className="meal-span"> icon </span>
        </li>
      </NavLink>
      </ReactCSSTransitionGroup>

    );
  }
}

const mapStateToProps = ({ meals }, ownProps) => {
  return { meal: meals[ownProps.id] };
}

export default connect(mapStateToProps)(Meal);
