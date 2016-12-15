import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  // render "saved" and "log out" buttons only when user is logged in to app
  loggedIn(isLoggedIn) {
    if(isLoggedIn) {
      return (
        <div className="header-links">
          <button onClick={this.props.fetchSavedRestaurants}>SAVED</button>
          <button onClick={this.props.handleLogout}>LOGOUT</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <h1>The Moodie Foodie</h1>
        {this.loggedIn(this.props.isLoggedIn)}
      </div>
    );
  }
}

export default Header;
