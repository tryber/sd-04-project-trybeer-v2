const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middleware.validateLogin, usersController.loginUsersCont);

module.exports = { loginRouter };
