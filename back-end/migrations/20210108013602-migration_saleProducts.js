module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProductsTable = queryInterface.createTable('salesProducts', {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: 'sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    return SalesProductsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('salesProducts'),
};
