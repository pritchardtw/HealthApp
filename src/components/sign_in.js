import React, { Component } from 'react';

export default class SignIn {
  render() {
    return(
      <div className="sign-in-window">
        <div>
          <input className="form-control" type="text" placeholder="Email"></input>
        </div>
        <div>
          <input className="form-control" type="password" placeholder="Password"></input>
        </div>
        <div>
          <button className="btn btn-primary" onClick={}>Login</button>
        </div>
      </div>
    );
  }
}
