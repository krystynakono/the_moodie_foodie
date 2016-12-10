const router = require('express').Router();
const { getSavedRestaurants, saveRestaurant } = require('../models/restaurant.js');

// Get all saved restaurants
router.get('/:user_id', getSavedRestaurants, (req, res) => {
  console.log('get all saved restaurants');
  res.json(res.saved);
});

// Save restaurant to restaurant DB
router.post('/', saveRestaurant, (req, res) => {
  console.log('Restaurant saved!');
});

module.exports = router;
