const express = require('express');
const { sales, products } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { saleId } = req.query;
    if (saleId) {
      const orderDetails = await sales.findAll({
        where: { id: saleId },
        include: [{ model: products, as: 'products', through: { attributes: ['quantity'] } }],
      });
      return res.status(200).json(orderDetails);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
