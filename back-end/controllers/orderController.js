const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
const generateOrder = async (req, res) => {
  try {
    const { email, total, address, number, cart } = req.body;

    const user = await userModel.findByEmail(email);
    const date = new Date().toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const result = await orderModel.createOrder(user.id, total, address, number, date);
    // codigo linha 10 e 12 added para funcionar o requisito 08
    await orderModel.insertSaleProduct(result.getAutoIncrementValue(), cart);

    res.status(200).json({ message: 'Pedido registrado' });
  } catch (err) {
    res.status(404).json({ message: 'erro' });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await orderModel.getSalesById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: 'id da venda nao encontrado' });
  }
};

module.exports = {
  generateOrder,
  getDetails,
};
