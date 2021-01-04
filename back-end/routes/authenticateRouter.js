const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.post('/', controllers.authenticate.userLogin);
router.post('/forgotPassword', controllers.authenticate.forgotPassword);
router.post('/reset_password', controllers.authenticate.resetPassword)
module.exports = router;
