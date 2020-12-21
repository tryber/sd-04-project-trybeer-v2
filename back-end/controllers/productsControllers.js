const { productsModels } = require('../models');

const getAllProductControllers = async (req, res) => {
  try {
    const products = await productsModels.getAllProductModels();

    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error('getAllProductControllers', err.message);
    return res.status(500).json({ message: 'Error fetching' });
  }
};

module.exports = { getAllProductControllers };
