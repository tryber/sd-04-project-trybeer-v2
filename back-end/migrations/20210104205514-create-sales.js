module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createSales = await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createSales;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sales');
  },
};
