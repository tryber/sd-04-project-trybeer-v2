const Product = (sequelize, DataTypes) => {
  const createProduct = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
    },
    url_image: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

  createProduct.associate = (models) => {
    createProduct.belongsToMany(models.sales, { as: 'products', foreignKey: 'productId', through: models.salesProducts });
  };
  return createProduct;
};

module.exports = Product;
