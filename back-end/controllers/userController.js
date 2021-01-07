const rescue = require('express-rescue');
const userService = require('../services/userService');
const { users } = require('../models');
const { createToken } = require('../middlewares/auth');

// Retorna todos os usuarios - somente para fins de teste
const getUsers = async (req, res) => {
  const usuarios = await users.findAll();
  return res.status(201).json(usuarios);
};

/* -----------------app começa aqui------------------------------ */
const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return res.status(200).json({ token: createToken(user), user });
});

const getUserByEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedUser = await userService.findByIdService(id);
    if (!selectedUser) {
      return res
        .status(401)
        .json({ message: 'Invalid entries. Try again CONTROLLER TRY' });
    }

    return res.status(200).json(selectedUser);
  } catch (_e) {
    return res
      .status(401)
      .json({ message: 'Invalid entries. Try again CONTROLLER CATCH' });
  }
};

// Controlers que Edita o usuário.

const saveEditController = async (req, res) => {
  const { name, email } = req.body;
  try {
    await userService.updateUserService(name, email);
    res.status(201).json({ message: 'Edition complete' });
  } catch (_e) {
    return res.status(401).json({ message: 'O sorry! Theres something wrong' });
  }
};

const registerUserController = async (req, res) => {
  const { name, email, password, checkbox } = req.body;
  try {
    const newUser = await userService.registerUserService(
      name,
      email,
      password,
      checkbox,
    );
    return res.status(201).json(newUser);
  } catch (_err) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

module.exports = {
  getUsers,
  userLogin,
  getUserByEmail,
  saveEditController,
  registerUserController,
};
