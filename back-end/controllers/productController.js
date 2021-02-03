const productService = require('../services/productService');

const findAllProductsController = async (_req, res) => {
  try {
    const allProducts = await productService.findAllProductsService();
    return res.status(200).json(allProducts);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: 'No products found on Database' });
  }
};

const findProductByIdController = async (req, res) => {
  try {
    const { id } = req.body;
    const product = productService.findProductByIdService(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: 'No product id matched' });
  }
};

const findProductByNameController = async (req, res) => {
  try {
    const { name } = req.body;
    const products = productService.findProductsByNameService(name);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(404).json({ message: 'No product with this name' });
  }
};

module.exports = {
  findAllProductsController,
  findProductByIdController,
  findProductByNameController,
};
