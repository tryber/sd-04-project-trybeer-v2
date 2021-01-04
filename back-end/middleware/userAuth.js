const jwt = require('jsonwebtoken');

const { secret } = require('../config/Auth');

const auth = (req, res, next) => {
  const tokenAuth = req.headers.authorization;

  if (!tokenAuth) throw new Error('missing token');

  const tokenParts = tokenAuth.split(' ');
  if (!(tokenParts.length === 2)) {
    throw new Error('token error');
  }

  const [schema, token] = tokenParts;
  if (!/^Bearer$/i.test(schema)) {
    return response.status(401).json({ message: 'token unformatted' });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'token invalid' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { auth };
