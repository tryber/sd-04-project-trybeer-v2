// const express = require('express');
// const salesProductsModel = require('../models/salesProductsModel');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const { saleId } = req.query;
//     if (saleId) {
//       const orderDetails = await salesProductsModel.getSaleById(saleId);
//       return res.status(200).json(orderDetails);
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
