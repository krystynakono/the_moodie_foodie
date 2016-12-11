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
        label={labels[i]}
        name={restaurant.name}
        rating={restaurant.rating}
        rating_img={restaurant.rating_img}
        url={restaurant.url}
        category={restaurant.category}
        image={restaurant.image}
        address1={restaurant.address1}
        address2={restaurant.address2}
        address3={restaurant.address3}
        phone={restaurant.phone}
        delete={this.props.delete}
      />,
    );
  }

  render() {
    return (
      <div className="savedList">
        <div className="saved-title-button">
          <button onClick={this.props.close}>&times;</button>
          <h2>Saved Spots</h2>
        </div>
        {this.renderSavedList()}
      </div>
    );
  }
}

export default SavedList;
