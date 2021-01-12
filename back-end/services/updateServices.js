const { usersModel } = require('../models');
const createToken = require('./createToken');

const updateUserServ = async (name, email) => {
  await usersModel.updateUsersNameMod(name, email);

  const user = await usersModel.getUserByEmailMod(email);

  const { password, ...data } = user;

  const token = createToken(data);

  return { token, data };
};

module.exports = { updateUserServ };
