// controller products
const { products } = require('../../models');

const getAll = async (_req, res) => {
  const allProducts = await products.findAll();
  console.log('produtos', allProducts);
  if (allProducts) return res.status(200).json(allProducts);
  return res.status(500).json({ products: [] });
};

module.exports = { getAll };
