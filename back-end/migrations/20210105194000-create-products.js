module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ProductsTable = queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { allownull: false, type: Sequelize.STRING },
      price: { allownull: false, type: Sequelize.INTEGER },
      url_image: { allownull: false, type: Sequelize.STRING },
    });

    return ProductsTable;
  },

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('products'),
};
