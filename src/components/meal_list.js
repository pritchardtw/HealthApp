import React, { Component } from 'react';
import Meal from './meal';
import { connect } from 'react-redux';

export default class MealList extends Component {

  renderMeals() {
    const { meal_ids, completed } = this.props;

    return _.map(meal_ids, (id, index) => {
      return <Meal meal_index={(this.props.day_index-1) * 3 + index + 1}
                   key={id}
                   id={id}
                   completed={completed}/>
    });
  }

  render() {
    return(
        <div className="meal-list">
          <ul>
            {this.renderMeals()}
          </ul>
        </div>
    );
  }
}
