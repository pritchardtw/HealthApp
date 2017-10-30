import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { loginWithGoogle, loginWithFacebook } from '../actions';
import { connect } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';

class Home extends Component {

  handleGoogleLogin() {
    this.props.loginWithGoogle(() => {
      this.props.history.push('/app');
    });
  }

  handleFacebookLogin() {
    this.props.loginWithFacebook(() => {
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
            <div className="continue-links">
                <Link className="homepage-app-link" to="/signup"><button className="btn btn-block btn-health">Sign Up</button></Link>
                <Link className="homepage-app-link" to="/signin"><button className="btn btn-block btn-health">Sign In</button></Link>
                <button className="btn btn-block btn-social btn-facebook" onClick={this.handleFacebookLogin.bind(this)}>
                  <span className="fa fa-facebook"></span> Continue with Facebook
                </button>
                <button className="btn btn-block btn-social btn-google" onClick={this.handleGoogleLogin.bind(this)}>
                  <span className="fa fa-google"></span> Continue with Google
                </button>
                <Link className="homepage-app-link" to="/app"><button className="btn btn-block btn-health">Continue to App</button></Link>
            </div>
          </div>
        </div>
        // <div className="landing-container">
        //   <div className="landing-div">
        //     <button className="btn btn-block btn-landing">true health</button>
        //     <button className="btn btn-block btn-landing">Login with Facebook</button>
        //     <button className="btn btn-block btn-landing">Login with Google</button>
        //     <button className="btn btn-block btn-landing">Sign Up</button>
        //     <button className="btn btn-block btn-landing">Sign In</button>
        //     <button className="btn btn-block btn-landing">Continue to App</button>
        //   </div>
        // </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth: auth.auth };
}

export default connect(mapStateToProps, { loginWithGoogle, loginWithFacebook })(Home);
