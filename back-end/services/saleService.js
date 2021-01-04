const moment = require('moment');
const {
  sales,
  sales_products: salesProducts,
  users,
  products,
} = require('../models');

const postNewSale = async (
  id,
  deliveryAddress,
  deliveryNumber,
  cart,
  totalPrice,
) => {
  const date = moment().format('YYYY/MM/DD h:mm:ss');
  const status = 'Pendente';

  const sale = await sales.create({
    user_id: id,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    sale_date: date,
    status,
  });

  cart.forEach(async (productCart) => {
    const { id: productId, quantity } = productCart;
    await salesProducts.create({
      sale_id: sale.id,
      product_id: productId,
      quantity,
    });
  });

  return { message: 'Compra realizada com sucesso!' };
};

const getSalesId = async (email) => {
  const user = await users.findOne({ where: { email } });
  if (!user) throw new Error('usuario nao encontrado');
  const salesUser = await sales.findAll({ where: { user_id: user.id } });
  return salesUser;
};

const orderDetail = async (orderId) => {
  const sale = await sales.findByPk(orderId);
  const aproducts = await salesProducts.findAll({
    where: { sale_id: orderId },
    include: products,
  });
  return { aproducts, sale };
};

module.exports = {
  postNewSale,
  orderDetail,
  getSalesId,
};
