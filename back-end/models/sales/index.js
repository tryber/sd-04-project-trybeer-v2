const connection = require('../dbConnection');

const addSale = (id, value, address, number, date, status) => {
  const result = connection()
    .then((db) => db.getTable('sales')
      .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
      .values(id, value, address, number, date, status)
      .execute())
    .then((results) => results.getAutoIncrementValue())
    .catch((e) => e);
  return result;
};

const addSaleProduct = (saleId, prodId, quantity) => connection()
  .then((db) => db.getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, prodId, quantity)
    .execute())
  .catch((e) => e);

const findOrderByUserId = async (UId) => {
  const userOrder = await connection()
    .then((db) => db.getTable('sales').select([])
      .where('user_id = :userId')
      .bind('userId', UId)
      .execute())
    .then((results) => results.fetchAll())
    .then((sales) => sales.map(
      ([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => ({
        id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
      }),
    ));

  return userOrder;
};

const findAllSales = async () => {
  const sales = await connection()
    .then((db) => db.getTable('sales').select([])
      .execute())
    .then((results) => results.fetchAll())
    .then((sale) => sale.map(
      ([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => ({
        id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
      }),
    ));
  return sales;
};

module.exports = { addSale, addSaleProduct, findOrderByUserId, findAllSales };
