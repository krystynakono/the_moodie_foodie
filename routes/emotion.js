const router = require('express').Router();
const { readEmotion } = require('../services/emotion.js');

router.get('/', (req, res) => {
  res.json('emotion here');
});

router.post('/', readEmotion, (req, res) => {
  res.json(res.emotions);
});

module.exports = router;
