const validateName = (name) => name.match(/^[a-z ,.'-]{12,}$/i);
const validateEmail = (email) => email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);
const validatePassword = (password) => password.match(/[a-zA-Z0-9]/);

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
