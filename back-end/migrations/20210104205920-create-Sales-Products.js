module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SalesProducts = queryInterface.createTable(
      'Sales_Products',
      {
        sale_id: {
          primary_key: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Sales',
            key: 'sale_id',
          },
          type: Sequelize.INTEGER,
        },
        product_id: {
          primary_key: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Products',
            key: 'product_id',
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

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('Sales_Products'),
};