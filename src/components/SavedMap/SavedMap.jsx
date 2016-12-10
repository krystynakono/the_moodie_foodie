import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class SavedMap extends Component {

  render() {
    const savedMapContainer = <div style={{ height: '100%', width: '100%' }} />

    const center = {
      lat: 40.7128,
      lng: -74.0059,
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
