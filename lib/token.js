// code from Digital-Gypsy
const jwt = require('jsonwebtoken');

function createToken(tokenPayload) {
  // get private key from .env
  const key = process.env.JWT_SECRET;
  // sign a new encrypted token that expires in 24h
  console.log(tokenPayload);
  const newToken = jwt.sign(tokenPayload, key);
  // return a new json token
  console.log(newToken);
  return newToken;
}

module.exports = {
  createToken,
};
