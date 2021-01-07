// const rescue = require('express-rescue');
const { Sale, users } = require('../models');
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
    console.log('erro register', err.message);
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
    const orders = await users.findAll();
    res.status(200).json(orders);
  } catch (error) {
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

// const updateStatus = async (req, res) => {
//   try {
//     // const { id } = req.params;
//     // const updatedOrder = await Sale.update({ status }, { where: { id } });
//     // const updatedOrder = await Sale.findByPk(id);
//     // return res.status(200).json(updatedOrder);
//   } catch (error) {
//     return res.status(401).json({ message: 'BAD REQUEST' });
//   }
// };

module.exports = {
  loginUser,
  updateUser,
  registerUser,
  getUserOrders,
  updateStatus,
};
