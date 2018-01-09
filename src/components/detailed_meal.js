import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import YouTube from 'react-youtube';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import FacebookProvider, { ShareButton, Like } from 'react-facebook';
import ProgressForm from './progress_form';

class DetailedMeal extends Component {

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
              <h3>Ingredients</h3>
              {this.renderIngredients()}
              <h3>Preparation</h3>
              <p>{meal.preparation}</p>
              <YouTube opts={opts} videoId={meal.video_id} />
              <h3>Substitutions</h3>
              <p>{meal.substitutions}</p>
            </div>
            <ProgressForm {...this.props} />
            <div className="fb-share-like">
              <FacebookProvider appId="1997133177233738">
                <Like href="" colorScheme="light" showFaces share />
              </FacebookProvider>
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
           meal: meals[match.params.id],
           meal_index: match.params.meal_index,
         };
}

export default connect(mapStateToProps)(DetailedMeal);
