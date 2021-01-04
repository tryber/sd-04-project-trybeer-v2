const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

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
    const user = await userModel.findUserByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'invalid token' });
    }

    const { password, ...userInfo } = user;

    req.user = userInfo;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  createToken,
  validateJWT,
};
