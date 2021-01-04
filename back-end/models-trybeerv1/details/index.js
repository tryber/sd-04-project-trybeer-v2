const connection = require('../dbConnection/index');
const simpleConnection = require('../dbConnection/simpleconnection');

const getDetail = async (saleId) => {
  const session = await simpleConnection();
  const result = await session.sql(
    `SELECT
    sp.quantity as prodQuantity, p.name as prodName, (sp.quantity * p.price) as prodPrice, p.price as price 
    FROM sales_products as sp
    INNER JOIN products as p on sp.product_id = p.id
    WHERE sp.sale_id = ${saleId}`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((sale) => sale.map(
      ([prodQuan, prodName, prodPrice, price]) => ({ prodQuan, prodName, prodPrice, price }),
    ));
  if (!result.length) return null;
  return result;
};

// const getSaleInfo = async (saleId) => {
//   const saleINfo = await connection()
//     .then((db) => db.getTable('sales').select([])
//       .where('id = :saleId')
//       .bind('saleId', saleId)
//       .execute())
//     .then((results) => results.fetchAll())
//     .then((products) => products.map(([id, userId, totalPrice, adress, nAdd, data, status]) => ({
//       id, userId, totalPrice, adress, nAdd, data, status,
//     })));
//   return saleINfo;
// };

const updateSale = async (id) => {
  connection()
    .then((db) => db.getTable('sales')
      .update()
      .set('status', 'Entregue')
      .where('id = :id')
      .bind('id', id)
      .execute());
};

module.exports = { getDetail, updateSale };
