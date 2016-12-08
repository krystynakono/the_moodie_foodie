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
          value={this.props.loginName}
          name="loginName"
          placeholder="username"
          onChange={this.props.updateAuthForms}
        />
        <input
          type="password"
          value={this.props.loginPass}
          name="loginPass"
          placeholder="password"
          onChange={this.props.updateAuthForms}
        />
        <button
          id="login-button"
          onClick={this.props.handleLogin}
        >
          Log In
        </button>
        <button id="signupModal" onClick={this.onClickMethod.bind(this)}>Sign Up</button>
        <div id="signup" ref="signup">
          <input
            type="text"
            value={this.props.signupName}
            name="signupName"
            placeholder="username"
            onChange={this.props.updateAuthForms}
          />
          <input
            type="password"
            value={this.props.signupPass}
            name="signupPass"
            placeholder="password"
            onChange={this.props.updateAuthForms}
          />
          <button
            id="signup-form-button"
            onClick={this.props.handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
