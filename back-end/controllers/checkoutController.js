// const saleModel = require('../models/saleModel');
const saleService = require('../services/saleService');
const salesProductsService = require('../services/salesProductsService');

const checkoutController = async (req, res) => {
  const { total, address, number, date, status, products } = req.body;
  const id = req.user;
  const convertedDate = new Date(date);

  try {
    const registeredSale = await saleService.registerSaleService(
      id,
      total,
      address,
      number,
      convertedDate,
      status,
    );

    for (let i = 0; i < products.length; i += 1) {
      salesProductsService.registerSalesProductsService(
        registeredSale.id,
        products[i].productId,
        products[i].quantity,
      );
    }

    return res.status(201).json({ message: 'Compra realizada com sucesso!' });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports = checkoutController;
