const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');
const { profileRouter } = require('./profileRouter');
const { productsRouter } = require('./productsRouter');
const { salesRouter } = require('./salesRouter');
const { adminRouter } = require('./adminRouter');

module.exports = {
  loginRouter,
  registerRouter,
  profileRouter,
  productsRouter,
  salesRouter,
  adminRouter,
};
