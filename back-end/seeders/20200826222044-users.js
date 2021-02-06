module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admininstrador tryber',
        email: 'tryber@trybe.com.br',
        password: '12345678',
        role: 'administrator',
      },
      {
        name: 'Cliente Zé Birita',
        email: 'zebirita@gmail.com',
        password: '12345678',
        role: 'client',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
