const { users } = require('../models');
const { createToken } = require('./createToken');

const userRegister = async (name, email, pass, role) => {
  const userEmail = await users.findOne({ where: { email } });
  if (userEmail) throw new Error('E-mail already in database.');
  const user = await users.create({ name, email, password: pass, role });
  const { password, ...userData } = user;
  const token = createToken(userData);
  return { token, userData };
};

const userUpdate = async (name, email) => {
  const { id } = await users.findOne({ where: { email } });

  try {
    await users.update({ name }, { where: { id } });
    return { message: 'Atualização concluída com sucesso' };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { userRegister, userUpdate };
