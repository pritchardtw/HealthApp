import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginWithGoogle } from '../actions';
import { connect } from 'react-redux';

class Home extends Component {

  handleLogin() {
    this.props.loginWithGoogle(() => {
      this.props.history.push('/app');
    });
  }

  render() {
    return (
      <div className="home">
        <div className="banner">
          <div className="border-box">
            true health
          </div>
          <button className="btn btn-primary" onClick={this.handleLogin.bind(this)}>login with google</button>
          <Link to="/app" className="btn">foods</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginWithGoogle })(Home);
