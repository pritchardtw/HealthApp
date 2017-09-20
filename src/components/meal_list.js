import React, { Component } from 'react';
import Meal from './meal';
import { connect } from 'react-redux';
export default class MealList extends Component {

  componentWillMount() {
    console.log("Meal list will mount");
  }

  renderMeals() {
    const { meal_ids } = this.props;

    return _.map(meal_ids, id => {
      return <Meal key={id} id={id}/>
    });
  }

  render() {
    return(
        <div key={1} className="meal-list">
          <ul>
            {this.renderMeals()}
          </ul>
        </div>
    );
  }
}
