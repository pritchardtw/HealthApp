import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { mealSelected } from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Meal extends Component {

  updateSelectedMeal() {
    this.props.mealSelected(this.props.meal_index);
  }

  renderSpan() {
    const { completed } = this.props;

    if(completed) {
      return (<i className="fa fa-check" aria-hidden="true"></i>)
    } else {
      return (<i className="fa fa-circle-thin" aria-hidden="true"></i>)
    }
  }

  render() {
    const { meal, meal_index, id } = this.props;
    return(
        <NavLink className="meal"
                 activeClassName="active-nav"
                 to={`/app/${meal_index}/${id}`}>
          <li key={this.props.id}>
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

export default connect(mapStateToProps, { mealSelected })(Meal);
