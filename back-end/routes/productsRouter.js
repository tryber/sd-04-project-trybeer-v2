const { Router } = require('express');
const { productsControllers } = require('../controllers');

const productsRouter = Router();

productsRouter.get('/', productsControllers.getAllProductControllers);

module.exports = productsRouter;
