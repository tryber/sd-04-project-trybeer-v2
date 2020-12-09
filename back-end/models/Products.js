const productsModel = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      url_image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return products;
};

module.exports = productsModel;
