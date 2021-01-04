const { createToken } = require('../middlewares/auth');
const userModel = require('../models/userModel');

const findUserByEmail = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
  if (!user || user.password !== password) {
    return { err: { message: 'Incorrect username or password' } };
  }
  return { token: createToken(user), user };
};

const registerUserService = async (name, email, password, checkbox) => {
  const role = checkbox ? 'administrator' : 'client';
  const newUser = await userModel.registerUser(email, password, name, role);
  return newUser;
};

const findByIdService = async (id) => {
  try {
    const selectedId = await userModel.findByUserIdModel(id);
    if (selectedId) {
      return selectedId;
    }
    return null;
  } catch (_e) {
    return { err: { message: 'Invalid entries! Try again MODEL' } };
  }
};

const updateUserService = async (name, email) => {
  try {
    console.log('entroU no UPDATESERVICE', name, email);
    const sendUpdate = await userModel.saveUpdateModel(name, email);
    if (sendUpdate) {
      return sendUpdate;
    }
    return null;
  } catch (_e) {
    return { err: { message: 'Bad request from model' } };
  }
};

module.exports = {
  findUserByEmail,
  findByIdService,
  updateUserService,
  registerUserService,
};
