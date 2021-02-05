const { products, sales } = require('../models');

const listProduct = async () => products.findAll();

const listSales = async () => sales.findAll();

module.exports = {
  listProduct,
  listSales,
};
