import Joi from 'joi';

const numberSix = 6;
const numberTwelve = 12;

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(numberSix).required(),
});

const formSchema = Joi.object({
  name: Joi
    .string()
    .regex(/^[a-zA-Z\u00C0-\u00FF\s]+$/)
    .min(numberTwelve)
    .required(),

  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi
    .string()
    .min(numberSix)
    .required(),
});

export const validateLogin = (email, password) => loginSchema.validate({ email, password });

export const formValidate = (form) => {
  const { name, email, password } = form;
  const isValid = formSchema.validate({ name, email, password });
  if (isValid.error) return isValid.error.message;
  return true;
};
