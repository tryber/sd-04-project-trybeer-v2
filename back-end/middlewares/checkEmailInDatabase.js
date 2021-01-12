const { users } = require('../models');

const checkEmailInDatabase = async (req, res, next) => {
  const { email } = req.body;
  const isEmailAlreadyRegistered = await users.findOne({ where: { email } });
  if (isEmailAlreadyRegistered) {
    return res.status(409).json({ message: 'E-mail already in database.' });
  }
  next();
};

module.exports = checkEmailInDatabase;
