const { products, sales } = require('../models');

const listProduct = async () => products.findAll();

const listSales = async () => sales.findAll();

const newSale = async (payload) => products.create({ payload });

// const getSaleById = async (saleId) => {
//   const { date: oldDate, ...restOfSale } = await Products.findByPk(saleId);
//   const [day, month] = new Date(oldDate)
//     .toISOString()
//     .substring(0, 10)
//     .split('-')
//     .reverse();
//   return { ...restOfSale, date: `${day}/${month}` };
// };

// const updateSalesStatus = async (id) => Sales.update(id);

// const getSaleProducts = async (id) => SalesProducts.findByPk(id);

module.exports = {
  listProduct,
  listSales,
  newSale,
//   getSaleById,
//   getSaleProducts,
//   updateSalesStatus,
};
