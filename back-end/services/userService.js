const Users = require('../models');

// const createUser = async ({ userName, emailUser, password, isSeller }) => {
//   const emailInDatabase = await userModel.findOne(emailUser);
//   if (emailInDatabase) return { message: 'E-mail already in database.' };
//   const role = isSeller ? 'administrator' : 'client';
//   const newUser = await userModel.create(userName, emailUser, password, role);
//   return newUser;
// };

// const updateUser = async ({ userName, userEmail }) => {
//   const user = await userModel.findOne(userEmail);
//   if (user.userEmail !== userEmail) return { message: 'E-mail invalido' };
//   await userModel.update(userName, userEmail);
//   return 'Atualização concluída com sucesso';
// };

const login = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });
  console.log('model', user);
  if (user.password === password) {
    const { password: _, ...withoutPassword } = user;
    return withoutPassword;
  }
  return null;
};

module.exports = {
  // createUser,
  login,
  // updateUser,
};
