import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import YouTube from 'react-youtube';

class DetailedMeal extends Component {

  renderIngredients() {
    return _.map(this.props.meal.ingredients, (ingredient, index) => {
      return <p key={index}>{ingredient}</p>;
    });
  }

  render() {
    const { meal } = this.props;

    if(meal) {
      return(
        <ReactCSSTransitionGroup
            transitionName="fade-in"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={1}
            transitionAppear={true}
            transitionAppearTimeout={250}>
          <div key={meal.id} className="detailed-meal-container">
            <div className="detailed-meal">
              <h1>{meal.name}</h1>
              {this.renderIngredients()}
              <p>{meal.preparation}</p>
              <YouTube videoId={meal.video_id} />
              <p>{meal.substitutions}</p>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      );
    } else {
      return(
        <h3>loading...</h3>
      );
    }
  }
}

const mapStateToProps = ({ meals }, { match }) => {
  return { meal : meals[match.params.id] };
}

export default connect(mapStateToProps)(DetailedMeal);
