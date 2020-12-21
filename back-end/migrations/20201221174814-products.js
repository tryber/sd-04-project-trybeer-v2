module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Products = queryInterface.createTable('products', {
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
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Products;
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('products');
  },
};
