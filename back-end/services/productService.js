const { products } = require('../models');

const findAllProductsService = async () => {
  const allProducts = await products.findAll();
  return allProducts;
};

const findProductByIdService = async (id) => {
  const product = await products.findByPk(id);
  return product;
};

const findProductsByNameService = async (name) => {
  const productsByName = await products.findAll({
    where: {
      name,
    },
  });
  return productsByName;
};

module.exports = {
  findAllProductsService,
  findProductByIdService,
  findProductsByNameService,
};
