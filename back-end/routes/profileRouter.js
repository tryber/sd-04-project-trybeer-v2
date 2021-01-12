const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middlewares');

const profileRouter = Router();

profileRouter.put('/', middleware.validateUpdate, usersController.updateUsersNameCont);

module.exports = { profileRouter };
