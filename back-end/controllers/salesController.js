const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { sale, salesProduct } = require('../models');

const allSales = rescue(async (_req, res) => {
  const sales = await sale.findAll({
    attributes: { exclude: ['userId'] },
  });
  res.status(200).json(sales);
});

const finishSales = rescue(async (req, res) => {
  const { id, total, address, number, date, products, status } = req.body;
  const newSale = await salesServices.finishSalesServ(
    id,
    total,
    address,
    number,
    date,
    status,
  );
  for (let i = 0; i < products.length; i += 1) {
    const { productId, quantity } = products[i];
    salesProduct.create({
      sale_id: newSale.id,
      product_id: productId,
      quantity,
    });
  }

  res.status(200).json(newSale);
});

const updateStatusCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await sale.update(
    {
      status,
    },
    { where: { id } },
  );

  res.status(200).json({ status });
});

module.exports = {
  allSales,
  finishSales,
  updateStatusCont,
};
