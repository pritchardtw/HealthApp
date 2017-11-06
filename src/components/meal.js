import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { mealSelected } from '../actions';

class Meal extends Component {

  updateSelectedMeal() {
    this.props.mealSelected(this.props.meal_index);
  }

  renderSpan() {
    const { progress } = this.props;

    if(progress && progress.completed) {
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

const mapStateToProps = ({ meals, progress }, ownProps) => {
  return { meal: meals[ownProps.id],
           progress: progress[ownProps.meal_index]
         };
}

export default connect(mapStateToProps, { mealSelected })(Meal);
