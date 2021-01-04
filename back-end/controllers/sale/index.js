const { findOrderByUserId, findAllSales } = require('../../models/sales');

const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const order = await findOrderByUserId(userId);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(404).json({ message: 'No Orders Found' });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await findAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'No Orders Found' });
  }
};

module.exports = { getOrderByUserId, getAllSales };
