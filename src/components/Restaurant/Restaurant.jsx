import React, { Component } from 'react';
import MapContainer from '../MapsContainer/MapsContainer.jsx';
import './Restaurant.css';

class Restaurant extends Component {
  render() {
    return (
      <div className="restaurant-info-container">
        <h2>{this.props.eatHere.name}</h2>
        <div className="rating">
          <p>Rated: {this.props.eatHere.rating}</p>
          <img src={this.props.eatHere.rating_img_url} alt="rating"/>
        </div>
        <div className="snippit">
          <p>{this.props.eatHere.snippet_text}
            <a href={this.props.eatHere.url}>more info</a>
          </p>
        </div>
        <div className="address">
          <p>{this.props.eatHere.location.display_address[0]}</p>
          <p>{this.props.eatHere.location.display_address[1]}</p>
          <p>{this.props.eatHere.location.display_address[2]}</p>
        </div>
        <p>{this.props.eatHere.display_phone}</p>
        <div className="hidden-restaurant-form">
          <button onClick={this.props.saveRestaurant}>{this.props.savebtn}</button>
        </div>
        <button id="tryagain" onClick={this.props.tryAgain}>Not feeling it. Let's try this again.</button>
      </div>

    );
  }
}

export default Restaurant;
