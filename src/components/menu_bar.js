import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions';
import { firebaseAuth } from '../firebase/firebase';

class MenuBar extends Component {

  logout() {
    this.props.logout(() => {
      this.props.history.push("/");
    });
  }

  renderAuthElement() {
    let user = firebaseAuth.currentUser;
    if(user) {
      return (
        <li className="dropdown">
          <NavLink className="dropdown-toggle sliding-u-l-r" data-toggle="dropdown" to="#">
            {user.displayName ? user.displayName : user.email}
            <span className="caret"></span>
          </NavLink>
          <ul className="dropdown-menu">
            <li><a onClick={this.logout.bind(this)}>Logout</a></li>
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
            {this.props.pro ?
              <li className='pro-member'>
                  Pro Member!
              </li>
              :
              <li>
                <NavLink className="purchase-link" to={`${this.props.match.url}/health`}>
                  <button className="btn btn-purchase">Purchase Full Plan</button>
                </NavLink>
              </li>}
            <li><NavLink className="sliding-u-l-r" to={`${this.props.match.url}`}>App</NavLink></li>
            <li><NavLink className="sliding-u-l-r" to={`${this.props.match.url}/about`}>About</NavLink></li>
            <li><NavLink className="sliding-u-l-r" to={`${this.props.match.url}/grocery_list`}>Grocery Lists</NavLink></li>
            <li><NavLink className="sliding-u-l-r" to={`${this.props.match.url}/snacks`}>Snacks</NavLink></li>
            {this.renderAuthElement()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, purchase_plan }) => {
  return { auth, pro: purchase_plan.pro };

}

export default connect(mapStateToProps, { logout })(MenuBar);
