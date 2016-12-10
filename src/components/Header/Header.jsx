import React from 'react';
import './Header.css';

const Header = props => (
  <div className="header">
    <h1>The Moodie Foodie</h1>
    <div className="header-links">
      <button onClick={props.fetchSavedRestaurants}>SAVED</button>
      <button onClick={props.handleLogout}>LOGOUT</button>
    </div>
  </div>
);

export default Header;
