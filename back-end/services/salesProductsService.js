const { sales_products } = require('../models');

const registerSalesProductsService = async (saleId, productId, quantity) => {
  const newRegistered = await sales_products.create({
    sale_id: saleId,
    product_id: productId,
    quantity,
  });

  return newRegistered;
};

module.exports = {
  registerSalesProductsService,
};
