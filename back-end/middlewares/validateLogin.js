const joi = require('joi');

const schema = joi.object({
  email: joi.string().email()
    .required(),
  password: joi.string().min(6)
    .required(),
});

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error) throw error;
  next();
};

module.exports = validateLogin;
