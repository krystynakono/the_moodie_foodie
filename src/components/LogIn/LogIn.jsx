import React, { Component } from 'react';
import './LogIn.css';

class LogIn extends Component {

  // initially, login box will render
  // onclick, this will show the signup box and hide the login box
  onClickMethod() {
    const login = this.refs.login;
    const signup = this.refs.signup;

    login.style.display = 'none';
    signup.style.display = 'flex';
  }

  // once user has input all preferences for mood/food combinations (when counter is 7)
  // hide the question and food images and display the username/password input form
  showInfo(e) {
    this.props.quiz(e);
    const signupbox = this.refs.signup;
    const login = this.refs.login;
    const signup = this.refs.userinfo;
    const foodholder = this.refs.foodholder;
    const question = this.refs.question;
    if (this.props.counter === 7) {
      signupbox.style.width = '50%';
      login.style.padding = '0';
      signup.style.display = 'flex';
      question.style.display = 'none';
      foodholder.style.display = 'none';
    }
  }

  // check the current state of emotion and render the appropriate h2 tag
  // each tag has a unique id to target unique font-families
  checkEmotion(emotion) {
    if (emotion === 'HAPPY?') {
      return (
        <h2 className="emotion" id="happy-font">happy?</h2>
      );
    } else if (emotion === 'SAD?') {
      return (
        <h2 className="emotion" id="sad-font">sad?</h2>
      );
    } else if (emotion === 'HANGRY?') {
      return (
        <h2 className="emotion" id="angry-font">hangry?</h2>
      );
    } else if (emotion === 'SURPRISED?') {
      return (
        <h2 className="emotion" id="surprised-font">surprised?</h2>
      );
    } else if (emotion === 'CONTEMPT?') {
      return (
        <h2 className="emotion" id="contempt-font">contempt?</h2>
      );
    } else if (emotion === 'DISGUSTED?') {
      return (
        <h2 className="emotion" id="disgust-font">disgusted?</h2>
      );
    } else if (emotion === 'AFRAID?') {
      return (
        <h2 className="emotion" id="afraid-font">afraid?</h2>
      );
    } else if (emotion === 'NEUTRAL?') {
      return (
        <h2 className="emotion" id="neutral-font">neutral?</h2>
      );
    }
  }

  render() {
    return (
      <div className="signin-box">
        <div className="log-in-container" ref="login">
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
          <button id="signupModal" onClick={this.onClickMethod.bind(this)}>Don't have an account? Sign up here!</button>
        </div>
        <div id="signup" ref="signup">
          <h3 ref="question">What food do you crave when feeling</h3>
          <div className="emotion-container">
            {this.checkEmotion(this.props.emotion)}
            <div className="food-category-holder" ref="foodholder">
              <div className="food-image-holder">
                <img src="http://i.imgur.com/xPGzxs8.jpg" alt="Thai Food" id="thai" onClick={this.showInfo.bind(this)} />
                <p>Thai</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/IKBYTVe.jpg" alt="Mediterranean Food" id="meditteranean" onClick={this.showInfo.bind(this)} />
                <p>Mediterranean</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/hnTASai.jpg" alt="Southern Comfort Food" id="southern" onClick={this.showInfo.bind(this)} />
                <p>Southern</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/SD2e8e8.jpg" alt="Italian Food" id="italian" onClick={this.showInfo.bind(this)} />
                <p>Italian</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/36gPaWG.jpg" alt="American Food" id="american" onClick={this.showInfo.bind(this)} />
                <p>American</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/WRTzhsy.jpg" alt="Japanese Food" id="japanese" onClick={this.showInfo.bind(this)} />
                <p>Japanese</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/DsCrXTn.jpg" alt="Mexican Food" id="Mexican" onClick={this.showInfo.bind(this)} />
                <p>Mexican</p>
              </div>
              <div className="food-image-holder">
                <img src="http://i.imgur.com/TxjQUNg.jpg" alt="Chinese" id="Chinese Food" onClick={this.showInfo.bind(this)} />
                <p>Chinese</p>
              </div>
            </div>
          </div>
          <div id="userinfo" ref='userinfo'>
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
      </div>
    );
  }
}

export default LogIn;
