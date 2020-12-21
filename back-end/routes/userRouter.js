const { Router } = require('express');
const { userController } = require('../controllers');
const { usersModel } = require('../models');

const userRouter = Router();

userRouter.post('/', userController.createUserController);
userRouter.put('/update', userController.updateUserController);
/* userRouter.get('/', async (req, res) => {
  console.log('?');
  const test = await usersModel.findAll();
  res.status(200).json(test);
}); */

module.exports = userRouter;
