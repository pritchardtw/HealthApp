import React, { Component } from 'react';
import Meal from './meal';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MealList extends Component {

  renderMeals() {
    const { meal_ids, completed } = this.props;

    return _.map(meal_ids, (id, index) => {
      return <Meal key={id} id={id} completed={completed[index]}/>
    });
  }

  render() {
    return(
      <ReactCSSTransitionGroup
          transitionName="expand"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>
        <div className="meal-list">
          <ul>
            {this.renderMeals()}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
