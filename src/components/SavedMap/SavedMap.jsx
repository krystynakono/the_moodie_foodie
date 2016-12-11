import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import './SavedMap.css';

class SavedMap extends Component {

  render() {
    const savedMapContainer = <div id="see-saved-pins" style={{ height: '90%', width: '90%' }} />

    const center = {
      lat: parseFloat(this.props.location.lat),
      lng: parseFloat(this.props.location.lng)
    };

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const markers =  this.props.saved.map((restaurant, i) => {

      const marker = {
        position: {
          lat: parseFloat(restaurant.lat),
          lng: parseFloat(restaurant.lng),
        },
        label: labels[i],
      };

      return (
        <Marker
          key={i}
          {...marker}
        />
      );
    });

    return (
      <GoogleMapLoader
        containerElement={savedMapContainer}
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            defaultCenter={center}
            options={{ streetViewControl: false, mapTypeControl: false }}
          >
            { markers }
          </GoogleMap>
        }
      />
    );
  }
}

export default SavedMap;
