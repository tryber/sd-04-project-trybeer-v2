const { usersModel } = require('../models');
const authentication = require('../auth/authentication');
const { ERR_EMAIL_NOT_FOUND, ERR_INVALID_PASSWORD } = require('../utils/errorTypes');

const updateUserController = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log('Controller Data:', name, email);

    await usersModel.update({ name, email }, { where: { email } });
    return res.status(200).json({ up: 'Update realizado' });
  } catch (err) {
    console.log('Erro inesperado');
    console.log(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await authentication.authToken(email, password);
    return res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    if (err.message === ERR_EMAIL_NOT_FOUND || err.message === ERR_INVALID_PASSWORD) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
};

const createUserController = async (req, res) => {
  try {
    const data = req.body;
    const result = await usersModel.findAll({ where: { email: data.email } });

    console.log(result);

    if (result) {
      if (result.email === data.email) {
        return res.status(403).json({ message: 'E-mail already in database.' });
      }
    }

    await usersModel.create(data);
    const userInfo = await authentication.authToken(data.email, data.password);
    return res.status(201).json(userInfo);
  } catch (err) {
    console.error('createUserController', err.message);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

module.exports = {
  updateUserController,
  createUserController,
  loginController,
};
