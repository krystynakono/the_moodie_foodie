import React, { Component } from 'react';
import './Header.css';

const Header = props => (
  <div className="header">
    <h1>The Moodie Foodie</h1>
    <div className="header-links">
      <button>EAT</button>
      <button onClick={props.fetchSavedRestaurants}>STARED</button>
      <button onClick={props.handleLogout}>LOG OUT</button>
    </div>
  </div>
)

export default Header;
