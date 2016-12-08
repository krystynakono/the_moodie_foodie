// Routes adopted from Nicks work in Digital Gypsy App

const router = require('express').Router();
const { logIn, verifyUser } = require('../models/auth');
const { createUser } = require('../models/user');
// const { createToken } = require('../lib/token');

// authenticates the login and if ture, send a json token
router.post('/login', logIn, (req, res) => {
  res.json({
    token: res.token,
    id: res.id || 'invalid',
  });
});

// if posting to newuser, collect form data
// sends token of user data
router.post('/signup', createUser, (req, res) => {
  res.json({
    token: res.token,
    id: res.id,
  });
});

router.post('/verify', verifyUser, (req, res) => {
  res.json({
    token: res.token,
    id: res.id,
  });
});

module.exports = router;
