const saleModel = require('../models/saleModel');

const registerSaleService = async (userId, totalPrice, deliveryAdress,
  deliveryNumber, saleDate) => {
  const newSale = await saleModel.registerSale(userId, totalPrice, deliveryAdress,
    deliveryNumber, saleDate);
  return newSale;
};

const findSalesByUserId = async (uid) => {
  const sales = await saleModel.findAllSalesByUserId(uid);
  return sales;
};

const findAllSalesService = async () => {
  const allSales = await saleModel.findAllSales();
  return allSales;
};

const findSalesBySaleId = async (id) => {
  const sales = await saleModel.findOrderBySaleId(id);
  return sales;
};

module.exports = {
  registerSaleService,
  findAllSalesService,
  findSalesByUserId,
  findSalesBySaleId,
};
