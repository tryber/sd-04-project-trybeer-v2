const { productsModel } = require('../models');

const listProduct = async () => productsModel.getAllProducts();

const listSales = async () => productsModel.getAllSales();

const newSale = async (payload) => productsModel.insertNewSale(payload);

const getSaleById = async (saleId) => {
  const { date: oldDate, ...restOfSale } = await productsModel.getSaleById(saleId);
  const [day, month] = new Date(oldDate)
    .toISOString()
    .substring(0, 10)
    .split('-')
    .reverse();
  return { ...restOfSale, date: `${day}/${month}` };
};

const updateSalesStatus = async (id) => productsModel.updateSaleStatus(id);

const getSaleProducts = async (id) => productsModel.getSaleProducts(id);

module.exports = {
  listProduct,
  listSales,
  newSale,
  getSaleById,
  getSaleProducts,
  updateSalesStatus,
};
