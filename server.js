require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// import router for Yelp API
const yelpRouter = require('./routes/yelp');

// authorization router to signup/login and validate users
const authRouter = require('./routes/auth');

// import router for restaurant DB
const restaurantRoute = require('./routes/restaurant');

// import router for google maps reverse geocoding
const mapsRouter = require('./routes/maps');

// import router for cloudinary image services
const cloudinaryRouter = require('./routes/cloudinary');

// set up some looging
app.use(logger('dev'));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());

// set default static assets folder
app.use(express.static(path.join(__dirname, 'dist')));

// map our routes
app.use('/yelp', yelpRouter);
app.use('/auth', authRouter);
app.use('/restaurant', restaurantRoute);
app.use('/maps', mapsRouter);
app.use('/cloudinary', cloudinaryRouter);

app.listen(PORT, () => { console.log('Noms 🍕  🌮  🍱  🍟  🍜')});
