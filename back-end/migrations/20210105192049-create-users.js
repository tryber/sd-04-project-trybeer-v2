module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { allownull: false, type: Sequelize.STRING },
      email: { allownull: false, unique: true, type: Sequelize.STRING },
      password: { allownull: false, type: Sequelize.STRING },
      role: { allownull: false, type: Sequelize.STRING },
    });

    return UsersTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('users'),
};
