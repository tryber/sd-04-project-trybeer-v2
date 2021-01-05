const { User } = require('../models');

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
  try {
  const user = await User.findOne({ where: { email } });
  // console.log('model', user);
  if (user.password === password) {
    const { password: _, ...withoutPassword } = user;
    return withoutPassword;
  }
  // const { password: _, ...withoutPassword } = await userModel.getUserByEmail(email);
  // const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  // const testRegex = emailRegex.test(email);
  // if (!testRegex || user.email !== email) return { message: 'E-mail invalido' };
  // if (!password) return { message: 'A senha deve digitada' };
  // if (password.length < 6) return { message: 'Senha inválida' };
  // return { email };
  return null;
  } catch (e) {
    console.log(e.message);
  } 
};

module.exports = {
  // createUser,
  login,
  // updateUser,
};
