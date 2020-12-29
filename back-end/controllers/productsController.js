const { products } = require('../models');

const getAllProducts = async (_req, res) => {
  try {
    const foundProducts = await products.findAll();

    if (!foundProducts) {
      return res.status(404).json({ message: 'Products not found' });
    }

    return res.status(200).json(foundProducts);
  } catch (err) {
    console.error('getAllProductControllers', err.message);
    return res.status(500).json({ message: 'Error fetching' });
  }
};

module.exports = { getAllProducts };
