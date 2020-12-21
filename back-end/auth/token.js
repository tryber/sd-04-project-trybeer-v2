const JWT = require('jsonwebtoken');
const secretKey = require('./secretKey');
const { ALGORITHM, EXPIRES_IN } = require('./config');
const { ERR_INVALID_TOKEN } = require('../utils/errorTypes');

const generate = (payload) => new Promise((resolve) => {
  JWT.sign(
    payload,
    secretKey,
    {
      algorithm: ALGORITHM,
      expiresIn: EXPIRES_IN,
    },
    (err, token) => {
      if (err) {
        throw new Error(ERR_INVALID_TOKEN);
      }

      resolve(token);
    },
  );
});

module.exports = {
  generate,
};
