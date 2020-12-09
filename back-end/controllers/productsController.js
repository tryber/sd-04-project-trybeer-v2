const express = require('express');
const { products } = require('../models');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const Products = await products.findAll();
    return res.status(200).json(Products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
