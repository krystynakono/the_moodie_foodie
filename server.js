require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const AWS = require('aws-sdk');
const multer = require('multer');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

// code adopted from https://www.npmjs.com/package/multer-s3
// and help from https://gist.github.com/adon-at-work/26c8a8e0a1aee5ded03c
// Thank you SO MUCH Sabrina Mesa and Joey Pinas for ALL the help with multer
// and AWS!!

// file system
const fs = require('fs');

const s3 = new AWS.S3({ params: { Bucket: 'moodiefoodie' } });

function uploadToS3(file, destFileName, callback) {
  s3.upload({
    ACL: 'public-read',
    Body: fs.createReadStream(path.join(__dirname, file.path)),
    Key: destFileName.toString(),
    ContentType: 'image/png', // force download if it's accessed as a top location
  })
  .send(callback);
}

function doUpload(req, res, next) {
  console.log('file:', req.file);
  console.log('files: ', req.files);
  // console.log('body: ', req.body);
  // console.log('req: ', req);

  // console.log(req.body);
    // get the file from the req object
  const objFile = req.file;

    // create our own random id
  const newId = '1000' + parseInt(Math.random() * 10000000);

  // call the function uploadToS3 and send an anonymous function as third argument
  uploadToS3(objFile, newId, (err, data) => {
    if(err) {
      console.log(err);
      next(err);
    }
    console.log('data', data);
    res.urlFile = data.Location;
    next();
  });
}

const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('photo'), doUpload, (req, res) => {
  res.json(res.urlFile);
  // res.json(req.files || req.file);
});


// import router for Yelp API
const yelpRouter = require('./routes/yelp');

// authorization router to signup/login and validate users
const authRouter = require('./routes/auth');

// import router for restaurant DB
const restaurantRoute = require('./routes/restaurant');

// import router for google maps reverse geocoding
const mapsRouter = require('./routes/maps');

// import router for aws image services
// const awsRouter = require('./routes/aws');

// import emotion router
const emotionRouter = require('./routes/emotion');

// set up some looging
app.use(logger('dev'));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set default static assets folder
app.use(express.static(path.join(__dirname, 'dist')));

// map our routes
app.use('/yelp', yelpRouter);
app.use('/auth', authRouter);
app.use('/restaurant', restaurantRoute);
app.use('/maps', mapsRouter);
// app.use('/aws', awsRouter);
app.use('/emotion', emotionRouter);

app.listen(PORT, () => { console.log('Noms 🍕  🌮  🍱  🍟  🍜')});
