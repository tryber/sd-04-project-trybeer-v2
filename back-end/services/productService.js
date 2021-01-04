const productModel = require('../models/productModel');

const findAllProductsService = async () => {
  const allProducts = await productModel.findAllProducts();
  return allProducts;
};

const findProductByIdService = async (id) => {
  const product = productModel.findProductById(id);
  return product;
};

const findProductsByNameService = async (name) => {
  const products = productModel.findProductsByName(name);
  return products;
};

module.exports = {
  findAllProductsService,
  findProductByIdService,
  findProductsByNameService,
};
