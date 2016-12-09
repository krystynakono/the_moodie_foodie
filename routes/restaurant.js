const router = require('express').Router();
const { saveRestaurant } = require('../models/restaurant.js');

// Save restaurant to restaurant DB
router.post('/', saveRestaurant, (req, res) => {
  console.log('Restaurant saved!');
});

module.exports = router;
