import React, { Component } from 'react';

export default class MenuBar extends Component {
  render() {
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href={`${this.props.match.url}`}>True Health</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a className="sliding-u-l-r" href={`${this.props.match.url}`}>App</a></li>
            <li><a className="sliding-u-l-r" href={`${this.props.match.url}/about`}>About</a></li>
            <li><a className="sliding-u-l-r" href={`${this.props.match.url}/grocery_list`}>Grocery Lists</a></li>
            <li><a className="sliding-u-l-r" href={`${this.props.match.url}/snacks`}>Snacks</a></li>
            <li><a className="sliding-u-l-r" href="#">Log Out</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
