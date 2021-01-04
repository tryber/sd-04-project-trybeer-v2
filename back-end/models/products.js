const Product = (sequelize, DataTypes) => {
  const createProduct = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
    },
    urlImage: {
      type: DataTypes.STRING
    },
  }, { timestamps: false });

  createProduct.associate = (models) => {
    createProduct.hasMany(models.salesProducts, { as: 'salesProducts', foreignKey: 'productId' });
  };
  return createProduct;
};

module.exports = Product;
