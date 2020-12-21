const getCurrentDate = () => new Date().toISOString()
  .replace('T', ' ')
  .replace('Z', '');

module.exports = {
  getCurrentDate,
};

// `${new Date()
//   .toLocaleString('pt-BR', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   })
//   .split('/')
//   .reverse()
//   .join('-')} ${new Date().toLocaleString('pt-BR', {
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit',
// })}`;
