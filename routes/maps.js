const router = require('express').Router();

// Get user location
router.post('/', saveRestaurant, (req, res) => {
  console.log('Restaurant saved!');
});

module.exports = router
