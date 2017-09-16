import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="banner">
          <div className="border-box">
            true health
          </div>
          <Link to="/meals" className="btn">foods</Link>
        </div>
      </div>
    );
  }
}
