const getCurrentDate = () =>
  new Date().toISOString().replace('T', ' ').replace('Z', '');

module.exports = {
  getCurrentDate,
};
