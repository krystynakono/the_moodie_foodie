const db = require('./db.js');

// Go to the database and get all the restaurants the user has saved
function getSavedRestaurants(req, res, next) {
  db.any(`SELECT * FROM restaurants
          WHERE user_id = $1;`,
          req.params.user_id)
  .then((saved) => {
    res.saved = saved;
    next();
  })
  .catch(error => next(error));
}

// The user will save a restaurant to their collection
function saveRestaurant(req, res, next) {
  console.log('Save model');
  db.none(`INSERT INTO restaurants
          (name, rating, rating_img, url, category, phone, image, address1, address2, address3, lat, lng, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
          [req.body.name, req.body.rating, req.body.rating_img, req.body.url, req.body.category, req.body.phone, req.body.image, req.body.address1, req.body.address2, req.body.address3, req.body.lat, req.body.lng, req.body.user_id])
  .then((restaurant) => {
    res.restaurant = restaurant;
    next();
  })
  .catch(err => next(err));
}

// Delete a restaurant from collection
function deleteRestaurant(req, res, next) {
  console.log('delete restaurant');
  db.none(`DELETE FROM restaurants
           WHERE id = $1;`,
           req.params.id)
  .then(next())
  .catch(err => next(err));
}

module.exports = {
  getSavedRestaurants,
  saveRestaurant,
  deleteRestaurant,
};
