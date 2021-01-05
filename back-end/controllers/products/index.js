// controller products
const { products } = require('../../models');

const getAll = async (_req, res) => {
  const allProducts = await products.findAll();
  if (allProducts) return res.status(200).json(allProducts);
  return res.status(500).json({ products: [] });
};

module.exports = { getAll };
