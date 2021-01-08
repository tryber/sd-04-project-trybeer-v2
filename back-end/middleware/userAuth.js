const jwt = require('jsonwebtoken');

const secret = 'grup1';

const authenticar = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('missing token');
  const data = jwt.verify(token, secret);
  req.user = data;
  next();
};

module.exports = { authenticar };
