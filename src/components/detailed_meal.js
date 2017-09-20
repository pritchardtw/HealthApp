import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import YouTube from 'react-youtube';

class DetailedMeal extends Component {

  render() {

    const { meal } = this.props;

    return(
      <ReactCSSTransitionGroup
          transitionName="fade-in"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={1}
          transitionAppear={true}
          transitionAppearTimeout={250}>
        <div key={meal.id} className="detailed-meal">
          <h1>{meal.name}</h1>
          <p>{meal.ingredient}</p>
          <p>{meal.preparation}</p>
          <YouTube videoId={meal.video_id} />
          <p>{meal.substitutions}</p>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = ({ meals }, { match }) => {
  return { meal : meals[match.params.id] };
}

export default connect(mapStateToProps)(DetailedMeal);
