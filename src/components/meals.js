import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import DetailedMeal from './detailed_meal';

import Meal from './meal';

class Meals extends Component {

  renderMeals() {
    return _.map(this.props.meals, meal => {
      return (
                <Meal meal={meal} />
             );
    });
  }

  render() {
    console.log("logging props", this.props);
    const { match } = this.props;

    return (
      <div className="meals">
        <ul className="nav navbar-nav">
          {this.renderMeals()}
        </ul>
        <Route path={`${match.url}/:id`} component={DetailedMeal}/>
        <Route exact path={match.url} render={() => (
          <h3 key="Welcome">Welcome to the program.</h3>
        )}/>
      </div>
    );
  }
}

const mapStateToProps = ({ meals }) => {
  return { meals };
}

export default connect(mapStateToProps)(Meals);
