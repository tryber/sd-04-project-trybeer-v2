const Products = (sequelize, DataTypes) => sequelize.define(
  'Product',
  {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
);

module.exports = Products;
