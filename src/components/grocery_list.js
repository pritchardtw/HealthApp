import React, { Component } from 'react';

export default class GroceryList extends Component {
  render() {
    return(
      <div className="grocery-list sub-page">
        <h1>Week 1</h1>
        <ul>
          <li>potatoes</li>
          <li>more potatoes</li>
          <li>cucumber</li>
        </ul>
        <h1>Week 2</h1>
        <ul>
          <li>potatoes</li>
          <li>more potatoes</li>
          <li>cucumber</li>
        </ul>
        <h1>Week 3</h1>
        <ul>
          <li>potatoes</li>
          <li>more potatoes</li>
          <li>cucumber</li>
        </ul>
        <h1>Week 4</h1>
        <ul>
          <li>potatoes</li>
          <li>more potatoes</li>
          <li>cucumber</li>
        </ul>
      </div>
    );
  };
}
