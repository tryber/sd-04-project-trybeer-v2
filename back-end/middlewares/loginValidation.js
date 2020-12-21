const loginSchema = require('../schemas/loginSchema');

const validateLoginInput = (req, res, next) => {
  const validationResult = loginSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(401).json({ message: 'Invalid inputs' });
  }

  next();
};

module.exports = {
  validateLoginInput,
};
