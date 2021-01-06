const { sales, sales_products, products, models } = require('../models/');
const { getCurrentDate } = require('../utils/date');

const getAllSales = async (_req, res) => {
  try {
    const data = await sales.findAll({});
    if (!data.length) return new Error('Sales info not found');
    return res.status(200).json({ sales: data });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', err });
  }
};

const insertSale = async (req, res) => {
  try {
    const {
      userId,
      totalPrice,
      deliveryAddr,
      deliveryNumber,
      productId,
      quantity,
    } = req.body;
    const saleInserted = await sales.create({
      user_id: userId,
      total_price: totalPrice,
      delivery_address: deliveryAddr,
      delivery_number: deliveryNumber,
      sale_date: getCurrentDate(),
      status: 'Pendente'
    });

    for (let i = 0; i < productId.length; i += 1) {
      sales_products.create({
        sale_id: saleInserted.dataValues.id,
        product_id: productId[i],
        quantity: quantity[i],
      });
    }

    res.status(201).json({ message: 'Sale successfully created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id: saleId } = req.params;
    
    if (saleId) {
      const orderDetails = await sales.findOne({
        where: { id: saleId },
        include: [{ model: products, as: 'products' }],
      });
      console.log('orderDetails', orderDetails);
      return res.status(200).json(orderDetails);
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateSaleStatus = async (req, res) => {
  try {
    const { id: saleId } = req.params;
    const { status } = req.body;
    await sales.update({ status }, { where: { id: saleId } });
    res.status(200).json({ message: 'Sale updated succesfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  updateSaleStatus,
};
