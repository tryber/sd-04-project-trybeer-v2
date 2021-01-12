const Product = (sequelize, DataTypes) => {
  const Products = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Products;
};

module.exports = Product;
