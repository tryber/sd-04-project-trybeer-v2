const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/', userController.createUserController);
userRouter.put('/update', userController.updateUserController);

module.exports = userRouter;
