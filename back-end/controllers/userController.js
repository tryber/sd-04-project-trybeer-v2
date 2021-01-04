const rescue = require('express-rescue');
const userService = require('../services/userService');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email, password);

  if (user.err) {
    return res.status(401).json(user.err);
  }

  return res.status(200).json(user);
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

// Controles que Edita o usuário.

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
  userLogin,
  getUserByEmail,
  saveEditController,
  registerUserController,
};
