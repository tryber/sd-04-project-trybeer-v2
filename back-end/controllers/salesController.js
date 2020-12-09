// const express = require('express');
// const salesModel = require('../models/salesModel');
// const salesProductsModel = require('../models/salesProductsModel');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const { userId } = req.query;
//     if (userId) {
//       const salesById = await salesModel.getSalesByUserId(userId);
//       return res.status(200).json(salesById);
//     }
//     const sales = await salesModel.getSales();
//     return res.status(200).json(sales);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { userId, price, street, houseNumber, date, status, productId, quantity } = req.body;
//     const order =
//     await salesModel.registerSale(userId, price, street, houseNumber, date, status);

//     const saleId = order.getAutoIncrementValue();

//     for (let i = 0; i < productId.length; i++) {
//       salesProductsModel.registerSalesProducts(saleId, productId[i], quantity[i]);
//     }

//     return res.status(200).json({ message: 'dados inseridos nas duas tabelas' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.put('/', async (req, res) => {
//   try {
//     const { saleId, status } = req.body;
//     await salesModel.editSale(saleId, status);
//     return res.status(200).json({ message: 'updated' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
