const rescue = require('express-rescue');
const saleService = require('../services/saleService');
const { sales } = require('../models');

const getAllUserSales = rescue(async (req, res) => {
  const { email } = req.query;
  const asales = await saleService.getSalesId(email);
  res.json(asales);
});

const saleRegister = async (req, res) => {
  const { nameAdress, numberAdress, cart, user, totalPrice } = req.body;

  const { id } = user;

  const sale = await saleService.postNewSale(
    id,
    nameAdress,
    numberAdress,
    cart,
    totalPrice,
  );
  return res.status(200).json(sale);
};

const getSales = async (_req, res) => {
  const asales = await sales.findAll();

  // const allSales =
  // asales.map(([id, userId, totalPrice, nameAdress, numberAdress, date, status]) => (
  //   { id, userId, totalPrice, nameAdress, numberAdress, date, status }
  // ));

  return res.status(200).json(asales);
};

const getDetailsSales = async (req, res) => {
  const { id } = req.params;
  const result = await saleService.orderDetail(id);
  res.status(200).json(result);
};

const setStatusAsDelivered = (req, res) => {
  const { id } = req.params;
  return sales
    .update({ status: 'Entregue' }, { where: { id } })
    .then(() => res.status(200));
};

module.exports = {
  saleRegister,
  getSales,
  getDetailsSales,
  getAllUserSales,
  setStatusAsDelivered,
};
