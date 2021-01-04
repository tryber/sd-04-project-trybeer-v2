const jwt = require('jsonwebtoken');

const secret = 'grup1';

const createToken = (payload) => {
  const headers = { expiresIn: '30m', algorithm: 'HS256' };
  return jwt.sign(payload, secret, headers);
};

module.exports = { createToken };
