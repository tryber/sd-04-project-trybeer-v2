const { users } = require('../models');
const { createToken } = require('./createToken');

const userLogin = async (email, passwordParam) => {
  const user = await users.findOne({ where: { email } });
  if (!user) throw new Error('User not found');
  const { password, ...userData } = user.dataValues;
  if (user || passwordParam === password) {
    const token = createToken(userData);
    return { token, userData };
  }
};

module.exports = { userLogin };

