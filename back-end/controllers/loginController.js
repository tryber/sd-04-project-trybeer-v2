const express = require('express');
const createToken = require('../auth/createJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = createToken({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
