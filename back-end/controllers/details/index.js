const { sales, salesProducts, products } = require('../../models');

const getDetailController = async (req, res) => {
  try {
    const { id } = req.params;

    const spInfo = await salesProducts.findAll({ where: { saleId: id } });
    const teste = spInfo.map((e) => e.dataValues);
    const prodInfo = await Promise.all(teste.map(async (e) => {
      const { quantity } = e;
      const produto = await products.findOne({ where: { id: e.productId } });
      const { name, price } = produto;
      const prodPrice = quantity * price;
      return { quantity, name, price, prodPrice };
    }));

    if (prodInfo) {
      return res.status(200).json(prodInfo);
    }
    return res.status(500).json({ message: 'I have bad news' });
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

const postDetailController = async (req, res) => {
  try {
    const { status } = req.body;
    await sales.update(
      { status },
      { where: { id: req.params.id } },
    );
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

module.exports = { getDetailController, postDetailController };
