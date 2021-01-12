const rescue = require('express-rescue');
const userServ = require('../services');
const { user } = require('../models');

const loginUsersCont = rescue(async (req, res) => {
  const { email, password } = req.body;
  const result = await userServ.userLoginServ(email, password);
  console.log('result', result);
  return res.status(200).json(result);
});
const registerUsersCont = rescue(async (req, res) => {
  const existEmail = await user.findOne({ where: { email: req.body.email } });
  if (existEmail) throw new Error('E-mail already exist.');
  const { name, email, password, role } = req.body;
  const newUser = await user.create({ name, email, password, role });
  return res.status(200).json(newUser);
});
const updateUsersNameCont = rescue(async (req, res) => {
  const { name, email } = req.body;
  const updateUser = await userServ.updateUserServ(name, email);
  res.status(200).json(updateUser);
});
module.exports = {
  loginUsersCont,
  registerUsersCont,
  updateUsersNameCont,
};
