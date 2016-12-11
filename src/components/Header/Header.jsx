import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  loggedIn(isLoggedIn) {
    if(isLoggedIn) {
      return (
        <button onClick={this.props.fetchSavedRestaurants}>SAVED</button>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <h1>The Moodie Foodie</h1>
        <div className="header-links">
          {this.loggedIn(this.props.isLoggedIn)}
          <button onClick={this.props.handleLogout}>LOGOUT</button>
        </div>
      </div>
    );
  }
}

export default Header;
