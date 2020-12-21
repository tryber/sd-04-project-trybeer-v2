const userModel = require('../models/userModel');
const {
  ERR_EMAIL_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} = require('../utils/errorTypes');
const Token = require('./token');

const authToken = async (userEmail, userPassword) => {
  const user = await userModel.getUserByEmail(userEmail);

  if (!user) {
    throw new Error(ERR_EMAIL_NOT_FOUND);
  }

  if (userPassword !== user.password) {
    throw new Error(ERR_INVALID_PASSWORD);
  }
  // isolar esse trecho para ser usado tanto no login qnt no cadastro
  const token = await Token.generate({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userRole: user.role,
  });

  const { password, ...userInfo } = user;

  return { ...userInfo, token };
};

module.exports = {
  authToken,
};
