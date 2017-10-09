import React, { Component } from 'react';

export default class MenuBar extends Component {
  render() {
    return(
      // <nav className="navbar navbar-default">
      //   <div className="container-fluid nav-fluid">
      //     <div className="navbar-header">
      //       <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
      //         <span className="icon-bar"></span>
      //         <span className="icon-bar"></span>
      //         <span className="icon-bar"></span>
      //       </button>
      //       <a className="navbar-brand" href={`${this.props.match.url}`}>True Health</a>
      //     </div>
      //     <div class="collapse navbar-collapse" id="myNavbar">
      //       <ul className="nav navbar-nav navbar-right">
      //         <li><a className="sliding-u-l-r" href={`${this.props.match.url}`}>App</a></li>
      //         <li><a className="sliding-u-l-r" href={`${this.props.match.url}/about`}>About</a></li>
      //         <li><a className="sliding-u-l-r" href={`${this.props.match.url}/grocery_list`}>Grocery Lists</a></li>
      //         <li><a className="sliding-u-l-r" href={`${this.props.match.url}/snacks`}>Snacks</a></li>
      //         <li><a className="sliding-u-l-r" href="#">Log Out</a></li>
      //       </ul>
      //     </div>
      //   </div>
      // </nav>

      <nav className="navbar navbar-default">
        <div className="container-fluid nav-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={`${this.props.match.url}`}>True Health</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li><a className="sliding-u-l-r" href={`${this.props.match.url}`}>App</a></li>
              <li><a className="sliding-u-l-r" href={`${this.props.match.url}/about`}>About</a></li>
              <li><a className="sliding-u-l-r" href={`${this.props.match.url}/grocery_list`}>Grocery Lists</a></li>
              <li><a className="sliding-u-l-r" href={`${this.props.match.url}/snacks`}>Snacks</a></li>
              <li><a className="sliding-u-l-r" href="#">Log Out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
