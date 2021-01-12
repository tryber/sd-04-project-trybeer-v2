const { product } = require('../models');

const getAllProductsCont = async (_req, res) => {
  const products = await product.findAll();
  res.status(200).json(products);
};

module.exports = {
  getAllProductsCont,
};
