// const saleModel = require('../models/saleModel');
const saleService = require('../services/saleService');
const salesProductsService = require('../services/salesProductsService');

const checkoutController = async (req, res) => {
  const { total, address, number, date, products } = req.body;
  const id = req.user;
  const convertedDate = new Date(date)
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '');
  try {
    const registeredSale = await saleService.registerSaleService(
      id,
      total,
      address,
      number,
      convertedDate,
    );

    for (let i = 0; i < products.length; i++) {
      salesProductsService.registerSalesProductsService(
        registeredSale,
        //  usar o campo id mesmo
        products[i].id,
        products[i].quantity,
      );
    }

    return res.status(201).json({ message: 'Compra realizada com sucesso!' });
  } catch (_err) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

module.exports = checkoutController;
