const { user } = require('../models');
const createToken = require('./createToken');

const registerUsersServ = async (name, email, passwordInp, role) => {
  console.log('role', role);
  const userCreate = await user.create({ name, email, passwordInp, role });
  const { password, ...data } = userCreate;
  const token = createToken(data);
  return { token, data };
};
module.exports = { registerUsersServ };
