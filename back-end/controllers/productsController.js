const { productsService } = require('../services');
const productsModel = require('../models/productsModel');

const fetchProducts = async (_req, res) => {
  try {
    const response = await productsService.listProduct();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchSales = async (_req, res) => {
  try {
    const response = await productsService.listSales();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleData = await productsService.getSaleById(id);
    const products = await productsService.getSaleProducts(id);
    // console.log(products);

    return res.status(200).json({ ...saleData, products });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const newSale = async (req, res) => {
  try {
    await productsService.newSale(req.body);
    return res.status(200).json({ message: 'Compra realizada com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    // console.log('Body: ', req.body);
    // console.log('Params: ', req.params);
    await productsService.updateSalesStatus(id);
    const updatedOrder = await productsModel.getSaleById(id);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchProducts,
  fetchSales,
  fetchSaleById,
  newSale,
  updateStatus,
};
