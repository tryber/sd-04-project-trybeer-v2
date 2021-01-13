module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesTable = queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total_price: { allownull: false, type: Sequelize.INTEGER },
      delivery_address: { allownull: false, type: Sequelize.STRING },
      delivery_number: { allownull: false, type: Sequelize.STRING },
      sale_date: { allownull: false, type: Sequelize.STRING },
      status: { allownull: false, type: Sequelize.STRING },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
      },
    });

    return SalesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('sales'),
};
