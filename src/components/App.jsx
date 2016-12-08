import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import LogIn from './LogIn/LogIn.jsx';
import style from './App.css';

function loggedIn(isLoggedIn) {
  if (!isLoggedIn) {
    return (<LogIn />);
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isLoggedIn: false,
      signupName: '',
      signupPass: '',
      loginName: '',
      loginPass: '',
      userID: 0,
    };
  }

  // code attributed to Nick from Digital Gypsy project
  // updates all of the login/signup forms, filters by name
  updateAuthForms(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'loginName':
        this.setState({ loginName: value });
        break;
      case 'loginPass':
        this.setState({ loginPass: value });
        break;
      case 'signupName':
        this.setState({ signupName: value });
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
      console.log('the response is: ', response)
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
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
  }

  doLogin() {
    fetch('/your/login/route', {})
    .then(r => r.json())
    .then((token) => {
      localStorage.setItem('authToken', token)
      const newToken = localStorage.getItem('authToken')
      this.setState({ isLoggedIn: true })
    })
  }


  render() {
    return (
      <div className="app">
        <Header />
        {loggedIn(this.state.isLoggedIn)}
      </div>
    );
  }
}

export default App;
