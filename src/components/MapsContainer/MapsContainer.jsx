import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class RestaurantMap extends Component {

  render() {
    const mapContainer = <div style={{ height: '100%', width: '100%' }} />;

    const center = this.props.center;

    const marker = {
      position: {
        lat: this.props.eatHere.location.coordinate.latitude,
        lng: this.props.eatHere.location.coordinate.longitude,
      },
    };

    return (
      <GoogleMapLoader
        containerElement={mapContainer}
        googleMapElement={
          <GoogleMap
            defaultZoom={15}
            defaultCenter={center}
            options={{ streetViewControl: false, mapTypeControl: false }}
          >
            <Marker
              marker={marker}
            />
          </GoogleMap>
        }
      />
    );
  }
}

export default RestaurantMap;
