const { sales_products } = require('../models');

const registerSalesProductsService = async (saleId, productId, quantity) => {
  try {
    console.log(`SalesProductsService - salesId: ${saleId}, productId: ${productId}, quantity: ${quantity}`);
    const newRegistered = await sales_products.create({
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
