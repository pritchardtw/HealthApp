import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroceryList extends Component {
  renderIngredients(ingredients) {
    let flatIngredients = ingredients.reduce((acc, ingredients) => {
      return acc.concat(ingredients);
    }, []);
    return flatIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>);
  }

  render() {
    let { week1, week2, week3, week4 } = this.props;

    return(
      <div className="grocery-list sub-page">
        <h1>Week 1</h1>
        <ul>
          {this.renderIngredients(week1)}
        </ul>
        <h1>Week 2</h1>
        <ul>
          {this.renderIngredients(week1)}
        </ul>
        <h1>Week 3</h1>
        <ul>
          {this.renderIngredients(week1)}
        </ul>
        <h1>Week 4</h1>
        <ul>
          {this.renderIngredients(week1)}
        </ul>
      </div>
    );
  };
}

const mapStateToProps = ({ meals }) => {
   let ingredients = Object.values(meals).map(meal => meal.ingredients);

  return {
    week1 : ingredients.slice(0,7),
    week2 : ingredients.slice(7,14),
    week3 : ingredients.slice(14,21),
    week4 : ingredients.slice(21)
  }
}

export default connect(mapStateToProps)(GroceryList);
