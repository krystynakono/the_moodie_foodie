// parts of bcrypt auth code adapted from example from Rafa @ GA and Nick's work from Digital Gypsy.

const bcrypt = require('bcryptjs');
const { createToken } = require('../lib/token.js');
// const { getUserByUsername, getUserById } = require('../models/user');
const jwt = require('jsonwebtoken');
const psql = require('../db/db.js');

function logIn(req, res, next) {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(loginData);
  psql.any(`SELECT *
            FROM users
            WHERE username = $1;`,
            [loginData.username])
  .then(data => {
    let dbUsers = data;
    if (!(Array.isArray(data))) {
      dbUsers = [data];
    }
    dbUsers.forEach((user) => {
      const matches = bcrypt.compareSync(loginData.password, user.password);
      if (matches) {
        console.log(user);
        res.id = user.id;
        res.token = createToken(user.id);
        next();
      }
    })
    res.token = 'invalid';
    next();
  })
  .catch(error => console.log(error));
}

// authenticates the user
function verifyUser(req, res, next) {
  const token = req.body.token;
  console.log(req.body.token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      res.send(err);
      next(err);
    }
    res.token = createToken(req.body.id);
    next();
  } else {
    res.token = {
      error: true,
      message: 'Unauthenticated User',
    };
    next();
  }
}

module.exports = {
  logIn,
  verifyUser,
};
