// const fetch = require('node-fetch');
const cloudinary = require('cloudinary');


function upload(req, res, next) {
  console.log(req.params.file)

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  cloudinary.uploader.upload(req.params.file, (result) => {
    console.log(result);
    res.file = result;
    next();
  });
}

module.exports = { upload };
