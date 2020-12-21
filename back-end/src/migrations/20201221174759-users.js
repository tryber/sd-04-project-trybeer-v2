module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Users;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('users');
  },
};
