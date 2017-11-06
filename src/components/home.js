import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { loginWithGoogle, loginWithFacebook } from '../actions';
import { connect } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signUpOpen: false,
      signInOpen: false
    }
  }

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

  signUpFormToggle() {
    if(this.state.signUpOpen) {
      this.setState({ signUpOpen: false })
    } else {
      this.setState({ signUpOpen: true, signInOpen: false })
    }
  }

  signInFormToggle() {
    if(this.state.signInOpen) {
      this.setState({ signInOpen: false })
    } else {
      this.setState({ signInOpen: true, signUpOpen: false })
    }
  }

  signUp(event) {

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
                <button className="btn btn-block btn-health" onClick={this.signUpFormToggle.bind(this)}>Sign Up</button>
                <ReactCSSTransitionGroup
                    transitionName="expand"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                    transitionAppear={true}
                    transitionAppearTimeout={400}>
                { this.state.signUpOpen ?
                  <div className="dropdown sign-up-dropdown">
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
                      <button className="btn btn-block btn-continue" onClick={this.signUp}>Continue</button>
                    </div>
                  </div>
                  :
                  ""
                }
                </ReactCSSTransitionGroup>
                <button className="btn btn-block btn-health" onClick={this.signInFormToggle.bind(this)}>Sign In</button>
                <ReactCSSTransitionGroup
                    transitionName="expand"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}
                    transitionAppear={true}
                    transitionAppearTimeout={400}>
                { this.state.signInOpen ?
                  <div className="dropdown sign-in-dropdown">
                    <div>
                      <input className="form-control" type="text" placeholder="Email"></input>
                    </div>
                    <div>
                      <input className="form-control" type="password" placeholder="Password"></input>
                    </div>
                    <div>
                      <button className="btn btn-block btn-continue" onClick={this.signIn}>Continue</button>
                    </div>
                  </div>
                  :
                  ""
                }
                </ReactCSSTransitionGroup>
                <button className="btn btn-block btn-social btn-facebook" onClick={this.handleFacebookLogin.bind(this)}>
                  <span className="fa fa-facebook"></span> Continue with Facebook
                </button>
                <button className="btn btn-block btn-social btn-google" onClick={this.handleGoogleLogin.bind(this)}>
                  <span className="fa fa-google"></span> Continue with Google
                </button>
                <Link className="homepage-app-link" to="/app"><button className="btn btn-block btn-health">Continue as Guest</button></Link>
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
