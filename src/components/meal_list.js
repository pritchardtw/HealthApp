import React, { Component } from 'react';
import Meal from './meal';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MealList extends Component {

  renderMeals() {
    const { meal_ids } = this.props;

    return _.map(meal_ids, id => {
      return <Meal key={id} id={id}/>
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
        <div key={1} className="meal-list">
          <ul>
            {this.renderMeals()}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
