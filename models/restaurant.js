const db = require('../db/db.js');

// The user will save a restaurant to their collection
function saveRestaurant(req, res, next) {
  console.log('Save model');
  db.none(`INSERT INTO restaurants
          (name, rating, rating_img, url, category, phone, image, address, lat, lng, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
          [req.body.name, req.body.rating, req.body.rating_img, req.body.url, req.body.category, req.body.phone, req.body.image, req.body.address, req.body.lat, req.body.lng, req.body.user_id])
  .then((restaurant) => {
    res.restaurant = restaurant;
    next();
  })
  .catch(err => next(err));
}

module.exports = {
  saveRestaurant,
};