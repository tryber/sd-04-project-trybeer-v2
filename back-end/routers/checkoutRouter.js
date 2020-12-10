const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.generateOrder);

module.exports = router;
