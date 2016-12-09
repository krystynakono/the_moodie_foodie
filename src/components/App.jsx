import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import LogIn from './LogIn/LogIn.jsx';
import style from './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      signupName: '',
      signupPass: '',
      loginName: '',
      loginPass: '',
      happy: '',
      sad: '',
      angry: '',
      surprised: '',
      contempt: '',
      disgust: '',
      fear: '',
      neutral: '',
      userID: 0,
      emotion: 'HAPPY?',
      counter: 0,
    };
  }

  loggedIn(isLoggedIn) {
    if (!isLoggedIn) {
      return (
        <LogIn
          updateAuthForms={event => this.updateAuthForms(event)}
          handleSignup={this.handleSignup.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
          loginName={this.state.loginName}
          loginPass={this.state.loginPass}
          signupName={this.state.signupName}
          signupPass={this.state.signupPass}
          handleLogout={this.handleLogout.bind(this)}
          emotion={this.state.emotion}
          quiz={event => this.quiz(event)}
          counter={this.state.counter}
        />
      );
    }
  }

  quiz(e) {
    if (this.state.counter === 0) {
      this.setState({
        happy: e.target.id,
        emotion: 'SAD?',
        counter: 1,
      });
    } else if (this.state.counter === 1) {
      console.log('happy: ' + this.state.happy);
      this.setState({
        sad: e.target.id,
        emotion: 'HANGRY?',
        counter: 2,
      });
    } else if (this.state.counter === 2) {
      console.log('sad: ' + this.state.sad);
      this.setState({
        angry: e.target.id,
        emotion: 'SURPRISED?',
        counter: 3,
      });
    } else if (this.state.counter === 3) {
      console.log('angry: ' + this.state.angry);
      this.setState({
        surprised: e.target.id,
        emotion: 'CONTEMPT?',
        counter: 4,
      });
    } else if (this.state.counter === 4) {
      console.log('surprised: ' + this.state.surprised);
      this.setState({
        contempt: e.target.id,
        emotion: 'DISGUSTED?',
        counter: 5,
      });
    } else if (this.state.counter === 5) {
      console.log('contempt: ' + this.state.contempt);
      this.setState({
        disgust: e.target.id,
        emotion: 'AFRAID?',
        counter: 6,
      });
    } else if (this.state.counter === 6) {
      console.log('disgust: ' + this.state.disgust);
      this.setState({
        fear: e.target.id,
        emotion: 'NEUTRAL?',
        counter: 7,
      });
    } else if (this.state.counter === 7) {
      console.log('afraid: ' + this.state.neutral);
      this.setState({
        neutral: e.target.id,
        emotion: '',
        counter: 8,
      });
    }
  }

  // code attributed to Nick from Digital Gypsy project
  // updates all of the login/signup forms, filters by name
  updateAuthForms(e) {
    const value = e.target.value;
    // console.log(e.target.name);
    // console.log(e.target.value);
    switch (e.target.name) {
      case 'loginName':
        this.setState({ loginName: value });
        break;
      case 'loginPass':
        this.setState({ loginPass: value });
        break;
      case 'signupName':
        this.setState({ signupName: e.target.value });
        break;
      case 'signupPass':
        this.setState({ signupPass: value });
        break;
      default:
        break;
    }
  }

  // passes the login data to the api
  // authenticates the data with server
  // respond with login and user ID
  handleLogin() {
    fetch('auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginName,
        password: this.state.loginPass,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log('the response is: ', response);
      if (response.id !== 'invalid') {
        this.setState({
          userID: response.id,
        });
        // saves jwt token and ID
        localStorage.id = response.id;
        localStorage.token = response.token;
      } else {
        alert('invalid login');
      }
    })
    .then(this.setState({
      loginName: '',
      loginPass: '',
    }))
    .then(console.log('logging in user: ', localStorage.id))
    .then(() => {
      this.setState({ isLoggedIn: true });
    })
    .catch(err => console.log(err));
  }

  hideSignUp() {
    const btn = document.querySelector('#signupModal');
    const modal = document.querySelector('#signup');
    btn.style.display = 'none';
    modal.style.display = 'none';
  }
  // sends the signup data to the api server
  // encrypts new user data and saves in db
  // authenticates the response and returns the user id
  handleSignup() {
    fetch('/auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signupName,
        password: this.state.signupPass,
        happy: this.state.happy,
        sad: this.state.sad,
        angry: this.state.angry,
        surprised: this.state.surprised,
        contempt: this.state.contempt,
        disgust: this.state.disgust,
        fear: this.state.fear,
        neutral: this.state.neutral,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        this.setState({
          userID: response.id,
        })
        localStorage.id = response.id;
      } else {
        alert(response.message);
      }
    })
    .then(this.setState({
      signupName: '',
      signupPass: '',
    }))
    .then(console.log('signup successful'))
    .then(this.hideSignUp())
    .catch(err => console.log(err));
  }

  // handles the logout of the user, will revert to login state
  // handleLogout() {
  //   fetch('/auth/logout', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'DELETE',
  //     body: JSON.stringify({
  //       id: this.state.userID,
  //     }),
  //   });
  //   this.setState({
  //     userID: 0,
  //     isLoggedIn: false,
  //   });
  //   console.log('logging out');
  //   window.localStorage.token = null;
  //   window.localStorage.id = null;
  // }
  handleLogout() {
    this.setState({
      isLoggedIn: false,
      userID: 0,
    });
    console.log('logging out');
  }

  // this authenticates the user on each page load
  // uses a token from local storage to verify access
  authenticateUser() {
    let token;
    if ((localStorage.getItem('token') === null)) {
      token == 'invalid';
    } else {
      token = localStorage.getItem('token')
    }
    console.log(token)
    fetch('/auth/verify', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        token: token,
      }),
    })
    .then(r => r.json())
    .then((response) => {
      if (response.name === 'JsonWebTokenError') {
        this.setState({ userID: 0 });
        localStorage.setItem('token', null);
      } else {
        this.setState({ userID: response.id });
        localStorage.setItem('token', response.token);
      }
    })
    .catch(err => console.log(err));
  }

  // doLogin() {
  //   fetch('/your/login/route', {})
  //   .then(r => r.json())
  //   .then((token) => {
  //     localStorage.setItem('authToken', token)
  //     const newToken = localStorage.getItem('authToken')
  //     this.setState({ isLoggedIn: true })
  //   })
  // }


  render() {
    return (
      <div className="app">
        <Header
          handleLogout={this.handleLogout.bind(this)}
        />
        {this.loggedIn(this.state.isLoggedIn)}
      </div>
    );
  }
}

export default App;
