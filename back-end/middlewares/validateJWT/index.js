const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.DB_SECRET || 'mysecrettoken';

const validateJWT = (req, res, next) => {
  try {
    const { token = '' } = req.cookies || {};

    if (!token) {
      return res.status(500).json({ message: 'token inválido!' });
    }

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.redirect(`/login?redirect=${encodeURIComponent(req.url)}`);
      // return res.status(500).json({ message: 'token inválido!' });
    }

    req.user = data;

    next();
  } catch (err) {
    return res.status(500).json({ message: 'token inválido!' });
  }
};

module.exports = { validateJWT };
