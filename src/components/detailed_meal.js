import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import YouTube from 'react-youtube';

class DetailedMeal extends Component {

  render() {

    const { meal } = this.props;

    return(
      <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={1}>
        <div key={meal.id} className="detailed-meal">
          <h1>{meal.name}</h1>
          <p>{meal.ingredient}</p>
          <p>{meal.preparation}</p>
          <YouTube videoId="QGURNgLlUa4" />
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
