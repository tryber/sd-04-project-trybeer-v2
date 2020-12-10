const express = require('express');

const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddlewares');

const router = express.Router();

router.post('/login', userMiddleware.validateUser, userController.userLogin);
router.post('/register', userController.userRegister);

module.exports = router;
