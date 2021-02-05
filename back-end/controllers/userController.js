const { sales } = require('../models');
const { userService } = require('../services');
const { users } = require('../models');

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
    const { userName, email } = req.body;
    const updated = await users.update(
      { userName },
      {
        where: { email },
      },
    );
    res.status(200).json(updated);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'BAD REQUEST' });
  }
};

const getUserOrders = async (req, res) => {
  const orders = await sales.findAll();

  return res.status(200).json(orders);
};

// const updateStatus = async (req, res) => {
//   try {
//     console.log("Aquiiii")
//     const updatedOrder = await sales.update({});
//     console.log("Aquiiiiii2")
//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     return res.status(401).json({ message: 'BAD REQUEST' });
//   }
// };

module.exports = {
  loginUser,
  updateUser,
  registerUser,
  getUserOrders,
  // updateStatus,
};
