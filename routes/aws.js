const router = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
});

router.get('/', (req, res) => {
  res.json('aws here');
});


module.exports = router;
