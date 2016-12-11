import React from 'react';
import './SavedListItem.css';

const SavedListItem = props => (
  <div className="saved-list-item">
    <h3>{props.label}. {props.name}</h3>
    <div className="saved-rating">
      <p>Rated: {props.rating}</p>
      <img src={props.rating_img} alt="rating" />
    </div>
    <div className="address">
      <p>{props.address1}</p>
      <p>{props.address2}</p>
      <p>{props.address3}</p>
      <p>{props.phone}</p>
    </div>
    <button onClick={() => props.delete(props.id)}>Remove</button>
  </div>
);

export default SavedListItem;
