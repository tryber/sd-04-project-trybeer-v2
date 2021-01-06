const NAME_PATTERN = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
const EMAIL_PATTERN = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const MIN_NAME_LENGTH = 12;
const PASS_LENGTH = 6;
const CHECKOUT_TIME = 2000;

const NUMBER_ZERO = 0;

const registerValidation = (name, email, pass) => (
  name.length < MIN_NAME_LENGTH
  || pass === ' '
  || pass === ''
  || !NAME_PATTERN.test(name)
  || !EMAIL_PATTERN.test(email)
);

const updateProfileValidation = (name) => name.length < MIN_NAME_LENGTH || name === ' ';

const setLocalStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

// const dateSaleValidation = () => {
//   const date = new Date();
//   const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//   return formatedDate;
// };

module.exports = {
  NAME_PATTERN,
  EMAIL_PATTERN,
  MIN_NAME_LENGTH,
  PASS_LENGTH,
  CHECKOUT_TIME,
  NUMBER_ZERO,
  registerValidation,
  setLocalStorage,
  updateProfileValidation,
};
