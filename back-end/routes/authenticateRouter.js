const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/userAuth');

const controllers = require('../controllers');

router.post('/', controllers.authenticate.userLogin);
router.post('/forgotPassword', auth, controllers.authenticate.forgotPassword);
router.post('/reset_password', controllers.authenticate.resetPassword)
module.exports = router;
