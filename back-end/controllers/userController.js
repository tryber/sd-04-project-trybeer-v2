const rescue = require('express-rescue');
const userService = require('../services/userService');

const userRegister = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  await userService.userRegister(name, email, password, role);
  // req.body = newUser
  next();
  // res.status(200).json(newUser);
});

const userUpdate = rescue(async (req, res) => {
  const { name, email } = req.body;
  const user = await userService.userUpdate(name, email);
  res.status(200).json(user);
});

module.exports = { userRegister, userUpdate };
