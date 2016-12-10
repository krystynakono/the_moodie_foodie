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
          <p>{this.props.eatHere.snippet_text}</p>
          <img src={this.props.eatHere.image_url} alt={this.props.eatHere.name} />
        </div>
        <div className="address">
          <p>{this.props.eatHere.location.display_address[0]}</p>
          <p>{this.props.eatHere.location.display_address[1]}</p>
          <p>{this.props.eatHere.location.display_address[2]}</p>
        </div>
        <p>{this.props.eatHere.display_phone}</p>
        <div className="hidden-restaurant-form">
          <button onClick={this.props.saveRestaurant}>Save for later</button>
        </div>
        <button onClick={this.props.tryAgain}>Not feeling it. Try again.</button>
      </div>

    );
  }
}

export default Restaurant;
