const rescue = require('express-rescue');
const { products } = require('../models');

const getAllProducts = rescue(async (_req, res) => {
  const allProducts = await products.findAll();
  const listagem = allProducts.reduce(
    (acc, crr) => ({
      ...acc,
      [crr.name]: crr,
    }),
    {},
  );
  // console.log(listagem['Stella Artois 275ml']);
  res.json(listagem);
});

module.exports = { getAllProducts };
