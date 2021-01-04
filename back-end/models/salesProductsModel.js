const connection = require('./connection');

const findAllSalesProducts = async () => {
  try {
    const db = await connection();
    const table = await db.getTable('sales_products');
    const results = await table.select([]).execute();
    const salesProducts = await results.fetchAll();
    return salesProducts.map(([saleId, productId, quantity]) => ({
      saleId,
      productId,
      quantity,
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
};

const registerSalesProducts = async (saleId, productId, quantity) => {
  try {
    console.log(`RegisterSalesProducts: ${saleId}, ${productId}, ${quantity}`);
    const db = await connection();
    const table = await db.getTable('sales_products');
    const result = await table
      .insert(['sale_id', 'product_id', 'quantity'])
      .values(saleId, productId, quantity)
      .execute();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  findAllSalesProducts,
  registerSalesProducts,
};
