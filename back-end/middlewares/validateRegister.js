const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(12)
    .required(),
  email: joi.string().email()
    .required(),
  password: joi.string().min(6)
    .required(),
  role: joi.string().valid('administrator', 'client')
    .required(),
});

const validateRegister = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return res.status(500).json(error.message);
  }

  next();
};

module.exports = validateRegister;
