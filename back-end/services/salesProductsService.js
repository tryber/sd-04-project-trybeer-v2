const { salesProducts } = require('../models');

const registerSalesProductsService = async (saleId, productId, quantity) => {
  console.log(
    `SalesProductsService: - salesId: ${saleId}, productId: ${productId}, quantity: ${quantity}`,
  );
  console.log(salesProducts);
  try {
<<<<<<< HEAD
=======
    console.log(`SalesProductsService - salesId: ${saleId}, productId: ${productId}, quantity: ${quantity}`);
>>>>>>> 6644cf11836303ac977cf52e182ce2838ad83902
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
