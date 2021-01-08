const joi = require('joi');

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(6)
    .required(),
});

const registerSchema = joi.object({
  name: joi
    .string()
    .regex(/^[a-zA-Z\u00C0-\u00FF\s]+$/)
    .min(12)
    .required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(6)
    .required(),
});

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;
  const result = loginSchema.validate({ email, password });
  if (result.error) throw result.error;
  next();
};

const registerValidation = (req, _res, next) => {
  const { name, email, password } = req.body;
  const result = registerSchema.validate({ name, email, password });
  if (result.error) throw result.error;
  next();
};

module.exports = { loginValidation, registerValidation };
