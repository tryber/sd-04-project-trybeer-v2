const { Router } = require('express');
const { salesController, adminController } = require('../controllers');
const middleware = require('../middlewares');

const adminRouter = Router();

adminRouter
  .get('/', middleware.authJWT, adminController.getProfile)
  // .get('/orders/:id', middleware.authJWT, adminController.getAdminSales)
  .get('/orders/:id', adminController.getAdminSales)
  .put(
    '/orders/:id',
    // middleware.authJWT,
    middleware.validateUpdateStatusSales,
    salesController.updateStatusCont,
  );

module.exports = { adminRouter };
