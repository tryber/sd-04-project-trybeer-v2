const createToken = require('./createToken');
const { userLoginServ } = require('./loginServices');
const { registerUsersServ } = require('./registerServices');
const { updateUserServ } = require('./updateServices');
const salesServices = require('./salesServices');
const secret = require('./secret');

module.exports = {
  createToken,
  userLoginServ,
  registerUsersServ,
  updateUserServ,
  salesServices,
  secret,
};
