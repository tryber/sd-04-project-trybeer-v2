const rescue = require('express-rescue');
const { getAll } = require('../models/genericModel');

const getAllProducts = rescue(async (_req, res) => {
  const products = await getAll(['id', 'name', 'price', 'url_image'], 'products');
  res.json(products);
});

module.exports = { getAllProducts };
