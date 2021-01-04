module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
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
        type: Sequelize.DECIMAL(4, 2),
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:
          'https://avancar.gov.br/avancar-web/images/slideshow/not-found.png',
      },
    });
  },

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('products'),
};
