const { Router } = require('express');
const { productsController } = require('../controllers');

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);

module.exports = productsRouter;
