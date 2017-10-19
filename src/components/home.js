import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { loginWithGoogle } from '../actions';
import { connect } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';

class Home extends Component {

  handleGoogleLogin() {
    this.props.loginWithGoogle(() => {
      this.props.history.push('/app');
    });
  }

  handleFacebookLogin() {
    this.props.loginWithGoogle(() => {
      this.props.history.push('/app');
    });
  }

  render() {
    if(firebaseAuth.currentUser) {
      return (<Redirect to="/app" />);
    } else {
      return (
        <div className="home">
          <div className="banner">
            <div className="border-box">
              true health
            </div>
            <div className="login-signup-window">
              <div className="login-window">
                <div>
                  <input className="form-control" type="text" placeholder="Email"></input>
                </div>
                <div>
                  <input className="form-control" type="password" placeholder="Password"></input>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={this.handleGoogleLogin.bind(this)}>Login</button>
                </div>
              </div>
              <div className="signup-window">
                <div>
                  <input className="form-control" type="text" placeholder="Email"></input>
                </div>
                <div>
                  <input id="password1" className="form-control" type="password" placeholder="Password"></input>
                </div>
                <div>
                  <input id="password2" className="form-control" type="password" placeholder="Confirm Password"></input>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={this.handleGoogleLogin.bind(this)}>Sign Up</button>
                </div>
              </div>
              <div className="continue-links">
                <div>
                  <button className="btn btn-primary" onClick={this.handleGoogleLogin.bind(this)}>continue with google</button>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={this.handleFacebookLogin.bind(this)}>continue with facebook</button>
                </div>
                <div>
                  <Link className="homepage-app-link" to="/app"><button className="btn btn-primary">continue to app</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth: auth.auth };
}

export default connect(mapStateToProps, { loginWithGoogle })(Home);
