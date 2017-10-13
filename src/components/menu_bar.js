import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MenuBar extends Component {

  renderAuthElement() {
    let auth = false;
    let profile = null;

    if(this.props.auth.auth) {
      auth = this.props.auth.auth;
      profile = this.props.auth.user.profile;
    }

    if(auth) {
      return (
        <li className="dropdown">
          <a className="dropdown-toggle sliding-u-l-r" data-toggle="dropdown" href="#">{profile.name}
          <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li>Logout</li>
          </ul>
        </li>
      );
    } else {
      return (<li><Link to="/" className="sliding-u-l-r">Login</Link></li>);
    }
  }

  render() {
    return(
      <nav className="navbar navbar-default">
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
            {this.renderAuthElement()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(MenuBar);
