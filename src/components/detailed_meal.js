import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import YouTube from 'react-youtube';
import { mealCompleted } from '../actions';

class DetailedMeal extends Component {

  markMealCompleted() {
    let { meal_index } = this.props;
    console.log("Meal Index", meal_index);
    this.props.mealCompleted(meal_index);
  }

  renderIngredients() {
    return _.map(this.props.meal.ingredients, (ingredient, index) => {
      return <p key={index}>{ingredient}</p>;
    });
  }

  render() {
    const { meal, match } = this.props;
    const opts = {
          height: '216',
          width: '384'
          }
    if(meal) {
      return(
        <ReactCSSTransitionGroup
            transitionName="fade-in"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={1}
            transitionAppear={true}
            transitionAppearTimeout={250}>
          <div key={match.params.id} className="detailed-meal-container">
            <div className="detailed-meal">
              <h1>{meal.name}</h1>
              {this.renderIngredients()}
              <p>{meal.preparation}</p>
              <YouTube opts={opts} videoId={meal.video_id} />
              <p>{meal.substitutions}</p>
              <button className="btn btn-primary" onClick={this.markMealCompleted.bind(this)}>Complete</button>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      );
    } else {
      return(
        <div className="spinner-container">
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ meals }, { match }) => {
  return {
           meal : meals[match.params.id],
           meal_index: match.params.meal_index
         };
}

export default connect(mapStateToProps, { mealCompleted })(DetailedMeal);
