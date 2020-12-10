const express = require('express');

const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateToken, productController.getOrderByUserIdController);
router.get('/:id', orderController.getDetails);

module.exports = router;
