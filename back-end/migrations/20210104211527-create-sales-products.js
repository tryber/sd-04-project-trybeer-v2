module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createSalesProducts = await queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: { model: 'Sales', key: 'id' },
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        references: { model: 'Products', key: 'id' },
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
