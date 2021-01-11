const { sales, salesProducts } = require('../../models');

const checkout = async (req, res) => {
  const { products, status, date, userId, cartValue, addressValue, numberValue } = req.body;
  try {
    const resultSale = await sales.create({
      userId,
      totalPrice: cartValue,
      deliveryAddress: addressValue,
      deliveryNumber: numberValue,
      saleDate: date,
      status,
    });

    const resultSaleProd = await Promise.all(
      products.map(async (e) => {
        const saleId = resultSale.dataValues.id;
        return salesProducts.create({
          saleId,
          productId: e.id,
          quantity: e.quantity,
        });
      }),
    );

    return res.status(200).json({ resultSale, resultSaleProd });
  } catch (error) {
    return res.status(500).json({ message: 'I have bad news' });
  }
};

module.exports = { checkout };
