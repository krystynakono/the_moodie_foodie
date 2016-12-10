const fetch = require('node-fetch');

const locationKey = process.env.LOCATION_KEY;

getLocation(req, res, next) {
    console.log('get location');
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${locationKey}`
, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
    .then(() => console.log('restaurant saved'));
}

module.exports = {
  getLocation,
}
