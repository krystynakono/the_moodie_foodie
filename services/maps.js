const fetch = require('node-fetch');

function fetchAddress(req, res, next) {
  console.log('fetching address');
  console.log(req.params);
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.lng}&key=AIzaSyDLO9BWFDxOz2rzAjvkDwel7aRz025PcgY`)
  .then(r => r.json())
  .then((address) => {
    res.address = address.results[0] || [];
    console.log(res.address);
    next();
  })
  .catch(err => console.log(err));
}

module.exports = { fetchAddress };
