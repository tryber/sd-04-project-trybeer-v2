const { authJWT } = require('./auth');
const validateLogin = require('./validateLogin');
const validateRegister = require('./validateRegister');
const validateUpdate = require('./validateUpdate');
const { validateUpdateStatusSales, validateFinishSales } = require('./validateSales');

module.exports = {
  authJWT,
  validateLogin,
  validateRegister,
  validateUpdate,
  validateUpdateStatusSales,
  validateFinishSales,
};
