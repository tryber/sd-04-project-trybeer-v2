const jwt = require('jsonwebtoken');
const { secret } = require('../config/Auth');

const GenerateToken = (payload) =>
  'Bearer ' + jwt.sign(payload, secret, { expiresIn: 86400 });

module.exports = { GenerateToken };
