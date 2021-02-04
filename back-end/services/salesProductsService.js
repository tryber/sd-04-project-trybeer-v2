const { salesProducts } = require('../models');

const registerSalesProductsService = async (saleId, productId, quantity) => {
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
