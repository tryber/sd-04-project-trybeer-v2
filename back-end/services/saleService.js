const { sales } = require('../models');
const { products } = require('../models');

const registerSaleService = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
) => {
  const newSale = await sales.create({
    user_id: userId,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    sale_date: saleDate,
    status,
  });
  return newSale;
};

const findSalesByUserId = async (uid) => {
  const salesByUID = await sales.findAll({ where: { user_id: uid } });
  return salesByUID;
};

const findAllSalesService = async () => {
  const allSales = await sales.findAll();
  return allSales;
};

const findSalesBySaleId = async (id) => {
  const salesById = await sales.findOne({
    where: { id },
    include: [
      {
        model: products,
        as: 'products',
      },
    ],
  });
  return salesById;
};

const updateSaleStatusService = async (id, status) => {
  const statusUpdated = await sales.update({ status }, { where: { id } });
  return statusUpdated;
};

module.exports = {
  registerSaleService,
  findAllSalesService,
  findSalesByUserId,
  findSalesBySaleId,
  updateSaleStatusService,
};
