const Products = (sequelize, DataTypes) =>
  sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      url_image: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      timestamps: false,
    },
  );

module.exports = Products;
