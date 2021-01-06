const { sales, salesProducts } = require('../../models');

const checkout = async (req, res) => {
  const { products, status, date, userId, cartValue, addressValue, numberValue } = req.body;
  console.log('userid', userId);
  console.log('status', status);
  console.log('date', date);
  console.log('cartvalue', cartValue);
  console.log('addressValue', addressValue);
  console.log('numberValue', numberValue);
  console.log('pprodutos', products);
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
    console.log('ERRORRR', error);
    return res.status(500).json({ message: 'I have bad news' });
  }
};

module.exports = { checkout };

// {
//   console.log('resultSale', resultSale.dataValues.id);
//   console.log('e.id', e.id);
//   console.log('e.quantity', e.quantity);
//   console.log('eeeeeee', e);
//   return salesProducts.create({
//     saleId: resultSale.dataValues.id,
//     productId: e.id,
//     quantity: e.quantity,
//   });
// }),
