// adapted from user management code attributed to Rafa @ GA and Digital Gypsy. Thanks!
// originally using mongo, modified for psql
const psql = require('./db.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../lib/token.js');

// creates a new user object using form input
function createUser(req, res, next) {
  const SALTROUNDS = 10;
  const userObject = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, SALTROUNDS),
    happy: req.body.happy,
    sad: req.body.sad,
    angry: req.body.angry,
    surprised: req.body.surprised,
    contempt: req.body.contempt,
    disgust: req.body.disgust,
    fear: req.body.fear,
    neutral: req.body.neutral,
  };
  console.log(userObject);

  psql.none(`INSERT INTO users
            (username, password, happy, sad, angry, surprised, contempt, disgust, fear, neutral)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
             [userObject.username, userObject.password, userObject.happy, userObject.sad, userObject.angry, userObject.surprised, userObject.contempt, userObject.disgust, userObject.fear, userObject.neutral])
  .then(() => {
    psql.one(`SELECT id
              FROM users
              WHERE username = $1
              AND password = $2;`,
              [userObject.username, userObject.password])
    .then((result) => {
      res.token = createToken(result);
      res.id = result.id;
      res.happy = result.happy;
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
