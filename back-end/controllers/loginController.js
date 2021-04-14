const rescue = require('express-rescue');
const loginService = require('../services/loginService');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const login = await loginService.userLogin(email, password);
  res.status(200).json(login);
});

module.exports = { userLogin };
