import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    return(
      <div className="sign-up-window">
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
          <button className="btn btn-primary" onClick={}>Sign Up</button>
        </div>
      </div>
    );
  }
}
