/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const fetch = require('node-fetch');

// The following modules are needed for oAuth with Yelp's API
// code attributed to TravelBuddy
const oauthSignature  = require('oauth-signature');
const n               = require('nonce')();
const qs              = require('querystring');
const _               = require('lodash');
const pgp             = require('pg-promise')();

// The url we are using for the request
const url             = 'http://api.yelp.com/v2/search';
// Set our secrets here
const consumerSecret  = process.env.consumerSecret;
const tokenSecret     = process.env.tokenSecret;
const consumerKey     = process.env.oauth_consumer_key;
const oauthToken      = process.env.oauth_token;

// Code found at: https://arian.io/how-to-use-yelps-api-with-node/
function restaurantSearch(req, res, next) {
  const httpMethod = 'GET';

  const food = `${req.params.food}+food`;
  const address = req.params.address;
  console.log(food);
  // Set parameters
  const userParams = {
    term: food,
    location: address,
    // cll: '40.7589, 73.9851',
  };

  // Set the required parameters here
  const requiredParams = {
    sort: '2',
    radius_filter: 2000,
    oauth_consumer_key: consumerKey,
    oauth_token: oauthToken,
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
  };

  // Combine all the parameters in order of importance
  const parameters = _.assign(userParams, requiredParams);

  // Call on Yelp's Oauth 1.0a server, and it returns a signature
  // Note: This siganture is only good for 300 seconds after oauth_timestamp
  const signature = oauthSignature.generate(httpMethod, url, parameters,
    consumerSecret, tokenSecret, { encodeSignature: false });

  // Add the signature to the list of parameters
  parameters.oauth_signature = signature;

  // Then turn the parameter's objects into a query string
  const paramURL = qs.stringify(parameters);

  // Add the query string to the url
  const apiURL = `${url}?${paramURL}`;

  // Then use fetch to send the API request
  fetch(apiURL)
  .then(r => r.json())
  .then((result) => {
    res.restaurants = result.businesses;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = {
  restaurantSearch,
};

