const { users } = require('../models');

const createUser = async ({ userName, emailUser, password, isSeller }) => {
  const emailInDatabase = await users.findOne({ where: { email: emailUser } });
  if (emailInDatabase) return { message: 'E-mail already in database.' };
  const role = isSeller ? 'administrator' : 'client';
  const newUser = await users.create({ name: userName, email: emailUser, password, role });
  return newUser;
};

// const updateUser = async ({ userName, userEmail }) => {
//   const user = await userModel.findOne({ where: { email: emailUser } });
//   if (user.userEmail !== userEmail) return { message: 'E-mail invalido' };
//   await userModel.update({ name: userName, email: userEmail });
//   return 'Atualização concluída com sucesso';
// };

const login = async ({ email, password }) => {
  const user = await users.findOne({ where: { email } });
  if (user.password === password) {
    const { password: _, ...withoutPassword } = user;
    return withoutPassword;
  }
  return null;
};

module.exports = {
  createUser,
  login,
  // updateUser,
};
