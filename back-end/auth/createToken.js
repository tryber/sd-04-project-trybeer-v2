const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = 'trybe2020';

const createToken = (payload) => {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, headers);

  return token;
};

module.exports = {
  createToken,
};
