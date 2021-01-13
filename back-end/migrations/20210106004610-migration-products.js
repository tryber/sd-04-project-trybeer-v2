module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ProductsTable = queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return ProductsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('products'),
};
