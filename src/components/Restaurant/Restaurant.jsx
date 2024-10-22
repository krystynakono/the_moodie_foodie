import React, { Component } from 'react';
import MapContainer from '../MapsContainer/MapsContainer.jsx';
import './Restaurant.css';

class Restaurant extends Component {
  render() {
    return (
      <div className="restaurant-info-container">
        <h1>Current Mood: {this.props.mood}</h1>
        <h2>{this.props.eatHere.name}</h2>
        <div className="rating">
          <p>Rated: {this.props.eatHere.rating}</p>
          <img src={this.props.eatHere.rating_img_url} alt="rating"/>
        </div>
        <h3>Cuisine: {this.props.eatHere.categories[0][0]}</h3>
        <div className="snippit">
          <p>{this.props.eatHere.snippet_text}
            <a href={this.props.eatHere.url} target="_blank">read more</a>
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
          <p> | </p>
          <button id="tryagain" onClick={this.props.tryAgain}>Not feeling it. Let's try this again.</button>
        </div>
      </div>

    );
  }
}

export default Restaurant;
