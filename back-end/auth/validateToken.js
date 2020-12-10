const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = 'trybe2020';

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(200).json('missing auth token');
    }

    const data = jwt.verify(token, SECRET);

    if (!data) {
      return res.status(200).json('jwt malformed');
    }

    req.user = data;

    next();
  } catch (error) {
    return res.status(200).json('jwt malformed');
  }
};

module.exports = validateToken;
