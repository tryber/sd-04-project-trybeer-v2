module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      url_image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://avancar.gov.br/avancar-web/images/slideshow/not-found.png',
      },
    },
    { timestamps: false },
  );

  products.associate = (models) => {
    products.belongsToMany(models.sales, {
      through: models.sales_products,
      foreignKey: 'product_id',
    });
  };

  return products;
};
