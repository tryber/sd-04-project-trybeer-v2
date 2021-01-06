const { sales } = require('../../models');

const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const order = await sales.findAll({ where: { userId } });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(404).json({ message: 'No Orders Found' });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const allSales = await sales.findAll();
    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(404).json({ message: 'No Orders Found' });
  }
};

module.exports = { getOrderByUserId, getAllSales };
