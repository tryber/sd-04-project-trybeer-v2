const { users } = require('../models');
const bcryptjs = require('bcryptjs');
const { GenerateToken } = require('../utils/GenerateToken');

const userRegister = async (name, email, pass, role) => {
  const userEmail = await users.findOne({ where: { email } });

  if (userEmail) throw new Error('E-mail already in database.');

  const user = await users.create({
    name,
    email,
    password: await bcryptjs.hash(pass, 10),
    role,
  });

  const { password, createdAt, updatedAt, passwordResetToken, passwordResetExpires,...userData } = user.dataValues;

  return { userData, token: GenerateToken(userData) };
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
