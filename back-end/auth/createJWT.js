require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'trybeerv2';

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

module.exports = createToken;
