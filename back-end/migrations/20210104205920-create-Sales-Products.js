module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProducts = queryInterface.createTable(
      'sales_products',
      {
        sale_id: {
          primary_key: true,
          onDelete: 'CASCADE',
          references: {
            model: 'sales',
            key: 'id',
          },
          type: Sequelize.INTEGER,
        },
        product_id: {
          primary_key: true,
          onDelete: 'CASCADE',
          references: {
            model: 'products',
            key: 'id',
          },
          type: Sequelize.INTEGER,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false },
    );
    return SalesProducts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('sales_products'),
};
