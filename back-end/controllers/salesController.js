const express = require('express');
const { sales, salesProducts } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const salesById = await sales.findAll({ where: { userId } });
      return res.status(200).json(salesById);
    }
    const Sales = await sales.findAll();
    return res.status(200).json(Sales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const {
      price: totalPrice,
      street: deliveryAddress,
      houseNumber: deliveryNumber,
      date: saleDate,
      status,
      userId,
      productId,
      quantity,
    } = req.body;

    const order = await sales.create({
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
      userId,
    });

    const saleId = order.dataValues.id; // pegar o id do pedido para salvar na tabela N:N

    for (let i = 0; i < productId.length; i += 1) {
      salesProducts.create({ saleId, productId: productId[i], quantity: quantity[i] });
    }

    return res.status(200).json({ message: 'dados inseridos nas duas tabelas' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { saleId, status } = req.body;
    await sales.update({ status }, { where: { id: saleId } });
    return res.status(200).json({ message: 'updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
