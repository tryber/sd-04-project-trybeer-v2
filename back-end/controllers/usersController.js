const express = require('express');
const { users } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const User = await users.findOne({ where: { email } });
      return res.status(200).json(User);
    }
    const Users = await users.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(Users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const User = await users.findOne({ where: { email } });
    if (User) {
      return res.status(409).json({ message: 'E-mail already in database.' });
    }
    await users.create({ name, email, password, role });
    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const User = await users.findOne({ where: { email } });
    if (!User) {
      return res.status(400).json({ message: 'User not found' });
    }
    await users.update({ name, email }, { where: { email } });
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
