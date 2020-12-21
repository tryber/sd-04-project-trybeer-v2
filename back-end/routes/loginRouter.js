const express = require('express');
const userController = require('../controllers/userController');
const loginValidation = require('../middlewares/loginValidation');

const loginRouter = express.Router();

loginRouter.post('/', loginValidation.validateLoginInput, userController.loginController);

module.exports = loginRouter;
