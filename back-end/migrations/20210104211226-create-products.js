module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createProducts = await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 2),
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createProducts;
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
