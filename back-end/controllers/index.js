const authenticate = require('./AuthenticateController');
const products = require('./productsController');
const user = require('./userController');
const sale = require('./saleController');

module.exports = { authenticate, products, user, sale };
