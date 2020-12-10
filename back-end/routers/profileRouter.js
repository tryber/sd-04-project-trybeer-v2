const express = require('express');

const userController = require('../controllers/userController');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateToken, userController.userProfile);

router.put('/', userController.editProfile);

module.exports = router;
