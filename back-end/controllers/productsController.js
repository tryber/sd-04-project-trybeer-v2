const { productsService } = require('../services');
const { products, sales, sales_products } = require('../models');

const fetchProducts = async (_req, res) => {
  try {
    const response = await products.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// const fetchSales = async (_req, res) => {
//   try {
//     const response = await productsService.listSales();
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const fetchSaleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const saleData = await productsService.getSaleById(id);
//     const products = await productsService.getSaleProducts(id);
//     // console.log(products);

//     return res.status(200).json({ ...saleData, products });
//   } catch (error) {
//     return res.json({ error: error.message });
//   }
// };

const newSale = async (req, res) => {
  try {
    // return Product.create({
    //   title: 'Chair',
    //   user: {
    //     firstName: 'Mick',
    //     lastName: 'Broadstone',
    //     addresses: [{
    //       type: 'home',
    //       line1: '100 Main St.',
    //       city: 'Austin',
    //       state: 'TX',
    //       zip: '78704'
    //     }]
    //   }
    // }, {
    //   include: [{
    //     association: Product.User,
    //     include: [ User.Addresses ]
    //   }]
    // });
    console.log(req.body);
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
      await sales_products.create({
        sale_id: saleId,
        product_id: id,
        quantity,
      });
    });
    // console.log('Response de sales: ', response._previousDataValues);
    // await productsService.newSale(req.body);
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
  // fetchSales,
//   fetchSaleById,
  newSale,
//   updateStatus,
};
