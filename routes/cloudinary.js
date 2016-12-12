const router = require('express').Router();
const { upload } = require('../services/cloudinary.js');

router.get('/', (req, res) => {
  res.json('cloud here');
});

router.get('/:file', upload, (req, res) => {
  res.json(res.file);
});

module.exports = router;
