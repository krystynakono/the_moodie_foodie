const router = require('express').Router();
const { getSavedRestaurants, saveRestaurant, deleteRestaurant } = require('../models/restaurant.js');

// Get all saved restaurants
router.get('/:user_id', getSavedRestaurants, (req, res) => {
  console.log('get all saved restaurants');
  res.json(res.saved);
});

// Save restaurant to restaurant DB
router.post('/', saveRestaurant, (req, res) => {
  console.log('Restaurant saved!');
});

// Delete restaurant from DB
router.delete('/:id', deleteRestaurant, (req, res) => {
  console.log('Restaurant has been removed from list.');
});

module.exports = router;
