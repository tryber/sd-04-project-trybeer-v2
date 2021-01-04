module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admininstrador tryber',
        email: 'tryber@trybe.com.br',
        password: '$2a$10$yhocjLRBjaQem9q4GSUqVuL3BlgJb9Zi7NrZ.0n9hgsQ05bFv/DSm',
        role: 'administrator',
      },
      {
        name: 'Cliente Zé Birita',
        email: 'zebirita@gmail.com',
        password: '$2a$10$yhocjLRBjaQem9q4GSUqVuL3BlgJb9Zi7NrZ.0n9hgsQ05bFv/DSm',
        role: 'client',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
