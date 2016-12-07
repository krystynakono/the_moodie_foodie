import React, { Component } from 'react';
import './LogIn.css';

class LogIn extends Component {

  onClickMethod() {
    const modal = this.refs.signup;
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
    // modal.style.display = (disp === 'block' ? 'none' : 'block');
  }

  render() {
    return (
      <div className="signin-box">
        <input
          type="text"
          // value="loginName"
          placeholder="username"
        />
        <input
          type="password"
          // value="password"
          placeholder="password"
        />
        <button
          id="login-button"
        >
          Log In
        </button>
        <button id="signupModal" onClick={this.onClickMethod.bind(this)}>Sign Up</button>
        <div id="signup" ref="signup">
          <input type="text"/>
          <button>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default LogIn;
