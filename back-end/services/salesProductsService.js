const salesProductsModel = require('../models/salesProductsModel');

const registerSalesProductsService = async (saleId, productId, quantity) => {
  const newRegistered = await salesProductsModel.registerSalesProducts(
    saleId,
    productId,
    quantity,
  );

  return newRegistered;
};

module.exports = {
  registerSalesProductsService,
};
