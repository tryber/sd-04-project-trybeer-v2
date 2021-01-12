const { salesProducts: sales_products } = require('../models');

const registerSalesProductsService = async (saleId, productId, quantity) => {
  console.log(
    `SalesProductsService: - salesId: ${saleId}, productId: ${productId}, quantity: ${quantity}`
  );
  try {
    const newRegistered = await salesProducts.create({
      sale_id: saleId,
      product_id: productId,
      quantity,
    });

    return newRegistered;
  } catch (err) {
    return console.dir(err);
  }
};

module.exports = {
  registerSalesProductsService,
};
