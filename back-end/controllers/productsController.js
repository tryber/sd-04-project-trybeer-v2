// const { productsService } = require('../services');
const { products, sales, salesProducts } = require('../models');

const fetchProducts = async (_req, res) => {
  try {
    const response = await products.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const fetchSales = async (_req, res) => {
  try {
    const response = await sales.findAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    // const productsResult = await sales.findAll({
    //   where: { id },
    // }, { include: [{ model: products, as: 'products', through: { attributes: [] } }] });
    const productsResult = await sales.findAll({
      where: { id },
      include: [{ model: products, as: 'products' }],
    });
    return res.status(200).json(productsResult);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const newSale = async (req, res) => {
  try {
    const { userId, total, rua, numeroCasa, status, purchasedProducts } = req.body;
    const { _previousDataValues: { id: saleId } } = await sales.create({
      user_Id: userId,
      total_price: total,
      delivery_address: rua,
      delivery_number: numeroCasa,
      sale_date: new Date(),
      status,
    });
    purchasedProducts.forEach(async ({ id, quantity }) => {
      await salesProducts.create({
        sale_id: saleId,
        product_id: id,
        quantity,
      });
    });
    return res.status(200).json({ message: 'Compra realizada com sucesso!' });
  } catch (error) {
    console.log('Error de servidor: ', error.message);
    return res.status(500).json({ message: error.message });
  }
};

// const updateStatus = async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     // console.log('Body: ', req.body);
//     // console.log('Params: ', req.params);
//     await productsService.updateSalesStatus(id);
//     const updatedOrder = await productsModel.findByPk(id);
//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  fetchProducts,
  fetchSales,
  fetchSaleById,
  newSale,
//   updateStatus,
};
