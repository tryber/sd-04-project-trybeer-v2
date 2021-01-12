const { users } = require('../models');

const findUserIdByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ where: { email } });
    if (user) {
      req.user = user.id;
    }

    next();
  } catch (e) {
    return res.status(500).json({ message: 'internal error' });
  }
};

module.exports = findUserIdByEmail;
