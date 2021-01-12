const { user } = require('../models');
const createToken = require('./createToken');

const userLoginServ = async (userEmail, userPassword) => {
  const userLogin = await user.findOne({ where: { email: userEmail } });
  const { password, ...data } = userLogin.dataValues;
  // console.log('userNovo', data);
  if (userLogin && userPassword === password) {
    const token = createToken(data);
    return { token, data };
  }
  throw Error('Login ou senha inválido');
};
module.exports = { userLoginServ };
