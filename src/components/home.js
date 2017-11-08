import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { loginWithGoogle, loginWithFacebook, signUpWithEmailAndPassword, loginWithEmailAndPassword } from '../actions';
import { connect } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signUpOpen: false,
      signInOpen: false,
      noPassword: false,
      passwordMissmatch: false,
      invalidSignUpEmail: false,
      invalidSignInEmail: false
    }
  }

  handleGoogleLogin() {
    this.props.loginWithGoogle();
  }

  handleFacebookLogin() {
    this.props.loginWithFacebook();
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

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  signUp(event) {
    let invalid = false;
    const email = $('#email1').val();
    const password1 = $('#password1').val();
    const password2 = $('#password2').val();

    console.log("email, password, password", email, password1, password2);

    if(!password1 && !password2) {
      invalid = true;
      this.setState({ noPassword : true });
    } else {
      this.setState({ noPassword : false });
    }

    if(password1 !== password2) {
      invalid = true;
      this.setState({ passwordMissmatch : true });
    } else {
      this.setState({ passwordMissmatch : false });
    }

    if(!this.validateEmail(email)) {
      invalid = true;
      this.setState({ invalidSignUpEmail : true });
    } else {
      this.setState({ invalidSignUpEmail : false });
    }

    if(!invalid) {
      this.props.signUpWithEmailAndPassword(email, password1);
    }
  }

  signIn(event) {
      let invalid = false;
      const email = $('#email').val();
      const password = $('#password').val();

      console.log("email, password", email, password);

      if(!this.validateEmail(email)) {
        invalid = true;
        this.setState({ invalidSignInEmail: true });
      } else {
        this.setState({ invalidSignInEmail: false });
      }

      if(!invalid) {
        this.props.loginWithEmailAndPassword(email, password);
      }
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
                  <div className="dropdown-form sign-up-dropdown">
                    <div>
                      <input id="email1" className="form-control" type="text" placeholder="Email"></input>
                    </div>
                    <div>
                      <input id="password1" className="form-control" type="password" placeholder="Password"></input>
                    </div>
                    <div>
                      <input id="password2" className="form-control" type="password" placeholder="Confirm Password"></input>
                    </div>
                    <div>
                      { this.state.invalidSignUpEmail ? <p className="error-message">Enter a valid email</p> : "" }
                    </div>
                    <div>
                      { this.state.noPassword ? <p className="error-message">Enter a password</p> : "" }
                    </div>
                    <div>
                      { this.state.passwordMissmatch ? <p className="error-message">Passwords do not match</p> : "" }
                    </div>
                    <div>
                      <button className="btn btn-block btn-continue" onClick={this.signUp.bind(this)}>Continue</button>
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
                  <div className="dropdown-form sign-in-dropdown">
                    <div>
                      <input id="email" className="form-control" type="text" placeholder="Email"></input>
                    </div>
                    <div>
                      <input id="password" className="form-control" type="password" placeholder="Password"></input>
                    </div>
                    <div>
                      { this.state.invalidSignInEmail ? <p className="error-message">Enter a valid email</p> : "" }
                    </div>
                    <div>
                      <button className="btn btn-block btn-continue" onClick={this.signIn.bind(this)}>Continue</button>
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

const mapStateToProps = ({ auth, loginErrors }) => {
  return { auth: auth.auth, loginErrors };
}

export default connect(mapStateToProps, { loginWithGoogle, loginWithFacebook, signUpWithEmailAndPassword, loginWithEmailAndPassword })(Home);
