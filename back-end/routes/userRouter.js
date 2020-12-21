const { Router } = require('express');
const { userController } = require('../controllers');
// const { users } = require('../models');

const userRouter = Router();

/* userRouter.get('/', async (req, res) => {
  console.log('?');
  const test = await users.findAll();
  res.status(200).json(test);
}); */
userRouter.post('/', userController.createUserController);
userRouter.put('/update', userController.updateUserController);

module.exports = userRouter;
