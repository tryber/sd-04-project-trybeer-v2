// const rescue = require('express-rescue');
const userModel = require('../models/userModel');
const productsModel = require('../models/productsModel');
const { userService } = require('../services');

const loginUser = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    if (newUser.message) {
      return res.status(200).json(newUser);
    }
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.body);
    if (updated.message) {
      return res.status(200).json(updated);
    }
    res.status(200).json(updated);
  } catch (error) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await userModel.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await productsModel.updateSaleStatus(id);
    const updatedOrder = await productsModel.getSaleById(id);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

module.exports = {
  loginUser,
  updateUser,
  registerUser,
  getUserOrders,
  updateStatus,
};
