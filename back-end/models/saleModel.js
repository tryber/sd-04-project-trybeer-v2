const { session } = require('./connection');
const { connection } = require('./connection');

const arrayToObj = (sales, selection) => sales.map((sale) => sale
  .reduce((acc, curr, i) => ({ ...acc, [selection[i]]: curr }), {}));

const insertNewSale = async (id,
  totalPrice, nameAdress, numberAdress, saleDate, status) => connection()
  .then((schema) => schema
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(id, totalPrice, nameAdress, numberAdress, saleDate, status)
    .execute())
  .then((query) => query.getAutoIncrementValue())
  .catch((err) => err);

const insertProductSale = async (saleId, productId, quantity) => connection()
  .then((schema) => schema
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, quantity)
    .execute())
  .catch((err) => err);

const getSales = async () => connection()
  .then((db) => db
    .getTable('sales')
    .select()
    .execute())
  .then((result) => result.fetchAll())
  .catch((err) => err);

const getAllSalesBy = async (info, fieldSearch, selection) => connection()
  .then((db) => db
    .getTable('sales')
    .select(selection)
    .where(`${fieldSearch} = :param`)
    .bind('param', info)
    .execute())
  .then((result) => result.fetchAll())
  .then((sales) => {
    if (!sales) return null;
    return arrayToObj(sales, selection);
  });

const getDetailsSale = async (id) => {
  const db = await session();
  const stmt = await db
    .sql(
      `
        SELECT sp.sale_id, sp.product_id, sp.quantity, p.name, p.price
        FROM Trybeer.sales_products AS sp
        INNER JOIN Trybeer.products AS p
        ON sp.product_id = p.id
        WHERE sp.sale_id = ?
    `,
    )
    .bind(id)
    .execute();

  const products = stmt.fetchAll();
  const result = products.map(([saleId, productId, quantity, name, price]) => ({
    saleId,
    productId,
    quantity,
    name,
    price,
  }));
  return result;
};

const setStatusAsDelivered = async (id) => connection()
  .then((db) => db
    .getTable('sales')
    .update()
    .set('status', 'Entregue')
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  insertNewSale,
  insertProductSale,
  getSales,
  getDetailsSale,
  getAllSalesBy,
  setStatusAsDelivered,
};
