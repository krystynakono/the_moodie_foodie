const router = require('express').Router();
const { restaurantSearch } = require('../services/yelp.js');

router.get('/:food/:address', restaurantSearch, (req, res) => {
  res.json(res.restaurants);
});

module.exports = router;
