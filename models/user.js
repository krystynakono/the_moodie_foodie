// adapted from user management code attributed to Rafa @ GA and Digital Gypsy. Thanks!
// originally using mongo, modified for psql
const psql = require('../db/db.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../lib/token.js');

// creates a new user object using form input
function createUser(req, res, next) {
  const SALTROUNDS = 10;
  console.log(req.body);
  const userObject = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, SALTROUNDS),
  };

  psql.none('INSERT INTO users (username, password) VALUES ($1, $2);',
             [userObject.username, userObject.password])
  .then(() => {
    psql.one(`SELECT id
              FROM users
              WHERE username = $1
              AND password = $2;`,
              [userObject.username, userObject.password])
    .then((result) => {
      console.log(result);
      res.token = createToken(result);
      res.id = result.id;
      next();
    })
    .catch(error => next(error));
  })
  .catch(error => console.log('Signup failed. Please try again'));
  // then gets the newly created id from the db
}

function getUserById(id) {
  psql.one(`SELECT *
            FROM users
            WHERE id = '${id}';`)
  .then(user => user)
  .catch(error => console.log(error));
}

function getUserByUsername(name) {
  psql.any(`SELECT *
            FROM users
            WHERE username = '${name}';`)
  .then(user => user)
  .catch(error => console.log(error));
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
