const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middlewares');

const registerRouter = Router();

registerRouter.post('/', middleware.validateRegister, usersController.registerUsersCont);

module.exports = { registerRouter };
