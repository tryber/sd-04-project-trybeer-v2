const { Products } = require('../models');

const getBeer = async (_req, res) => {
  try {
    const beer = await Products.findAll();

    res.status(200).json(beer);
  } catch (error) {
    res.status(404).json({ error: 'Nenhum product foi encontrado' });
  }
};

const getOrderByUserIdController = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await productModel.getOrderByUserId(id);
    res.status(200).json(orders);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getBeer,
  getOrderByUserIdController,
};
