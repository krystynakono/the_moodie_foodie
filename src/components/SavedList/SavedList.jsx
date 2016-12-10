import React, { Component } from 'react';
import SavedListItem from '../SavedListItem/SavedListItem.jsx';
import './SavedList.css';

class SavedList extends Component {

  renderSavedList() {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return this.props.saved.map((restaurant, i) =>
      <SavedListItem
        key={i}
        id={restaurant.id}
        name={restaurant.name}
        label={labels[i]}
        delete={this.props.delete}
      />,
    );
  }

  render() {
    return (
      <div className="saved-list">
        <h2>Saved Spots</h2>
        <button onClick={this.props.close}>X</button>
        {this.renderSavedList()}
      </div>
    );
  }
}

export default SavedList;
