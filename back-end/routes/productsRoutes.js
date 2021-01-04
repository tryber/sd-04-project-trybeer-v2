const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/products', productsController.fetchProducts);

router.get('/checkout', productsController.fetchProducts);

router.post('/checkout', productsController.newSale);

router.get('/orders', productsController.fetchSales);

router.get('/orders/:id', productsController.fetchSaleById);

router.put('/admin/orders/:id', productsController.updateStatus);

router.get('/admin/orders/:id', productsController.fetchSaleById);

module.exports = router;
