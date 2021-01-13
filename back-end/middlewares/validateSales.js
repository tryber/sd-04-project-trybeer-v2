const joi = require('joi');

const schema = {
  finishSales: joi.object({
    email: joi.string().email()
      .required(),
    total: joi.string()
      .required(),
    address: joi.string().min(3)
      .max(100)
      .required(),
    number: joi.number()
      .required(),
  }),
  updateSalesStatusSchema: joi.object({
    status: joi.string().valid('Pendente', 'Entregue', 'Preparando').required(),
  }),
};

const validateUpdateStatusSales = async (req, res, next) => {
  const { status } = req.body;
  const { error } = schema.updateSalesStatusSchema.validate({ status });

  if (error) {
    return res.status(500).json(error.message);
  }

  next();
};

const validateFinishSales = async (req, res, next) => {
  const { email, total, address, number } = req.body;
  const { error } = schema.finishSales.validate({
    email,
    total,
    address,
    number,
  });

  if (error) {
    return res.status(500).json(error.message);
  }

  next();
};

module.exports = {
  validateUpdateStatusSales,
  validateFinishSales,
};
