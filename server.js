require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// set up some looging
app.use(logger('dev'));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());

// set default static assets folder
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => { console.log('Noms 🍕  🌮  🍱  🍟  🍜')});
