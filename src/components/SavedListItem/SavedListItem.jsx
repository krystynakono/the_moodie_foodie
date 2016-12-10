import React from 'react';
import './SavedListItem.css';

const SavedListItem = props => (
  <div className="saved-list-item">
    <h3>{props.name}</h3>
    <div className="image-holder">
      <img src={props.image} alt={props.name} />
    </div>
    <button onClick={() => props.delete(props.id)}>Remove</button>
  </div>
);

export default SavedListItem;
