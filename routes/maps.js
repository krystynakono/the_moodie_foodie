const router = require('express').Router();
const { fetchAddress } = require('../services/maps.js');

router.get('/:lat/:lng', fetchAddress, (req, res) => {
  res.json(res.address);
});

module.exports = router;
