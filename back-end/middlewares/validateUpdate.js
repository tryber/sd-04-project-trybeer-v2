const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(12)
    .required(),
  email: joi.string().email()
    .required(),
});

const validateUpdate = async (req, res, next) => {
  const { name, email } = req.body;
  const { error } = schema.validate({ name, email });

  if (error) {
    return res.status(500).json(error.message);
  }

  next();
};

module.exports = validateUpdate;
