const Product = (sequelize, DataTypes) =>
  sequelize.define('products', {
    name: DataTypes.STRING,
    url_image: DataTypes.STRING,
    price: DataTypes.FLOAT,
  });

module.exports = Product;
