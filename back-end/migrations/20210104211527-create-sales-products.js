module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createSalesProducts = await queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: { model: 'sales', key: 'id' },
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: { model: 'products', key: 'id' },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
    return createSalesProducts;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('salesProducts');
  },
};
