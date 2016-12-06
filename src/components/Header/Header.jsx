import React, { Component } from 'react';
import './Header.css'

const Header = props => (
  <div className="header">
    <h1>The Moodie Foodie</h1>
    <div className="header-links">
      <h3>EAT</h3>
      <h3>STARED</h3>
      <h3>LOG OUT</h3>
    </div>
  </div>
)

export default Header;
