const auth = require('../auth/createToken');

const { Users } = require('../models');

const validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: `${email}`} });
    const { password: _, ...userSafe } = user;

    if (user.password !== password) throw new Error();
    req.token = auth.createToken(userSafe);

    req.user = userSafe;
    next();
  } catch (error) {
    return res.status(404).json({ message: 'Email invalido' });
  }
};

module.exports = {
  validateUser,
};
