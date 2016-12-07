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
    };
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
