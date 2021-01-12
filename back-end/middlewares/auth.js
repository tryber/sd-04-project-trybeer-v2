const jwt = require('jsonwebtoken');
const { users } = require('../models');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = 'meusegredo';

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, secret, headers);
  return token;
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, secret);
    const user = await users.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(401).json({ message: 'invalid token' });
    }

    /* const { password, ...userInfo } = user; */

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  createToken,
  validateJWT,
};
