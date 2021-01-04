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
        type: Sequelize.DECIMAL(4,2),
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createProducts;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
