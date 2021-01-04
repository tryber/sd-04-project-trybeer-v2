const rescue = require('express-rescue');
const authenticateService = require('../services/authenticateService');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const login = await authenticateService.Login(email, password);
 
  res.status(200).json(login);
});

const forgotPassword = rescue(async (req, res) => {
  const { email } = req.body;

  const result = await authenticateService.forgotPassword(email);
 
  res.status(200).json(result);
});

const resetPassword = rescue(async (req, res) => {
  const { email, token, password } = req.body;

  const result = await authenticateService.resetPassword(email, token, password);
 
  res.status(200).json(result);
});

module.exports = { userLogin, forgotPassword, resetPassword };
