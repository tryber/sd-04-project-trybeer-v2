const productsModel = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  Products.associate = (models) => {
    Products.hasMany(models.sales_products, { foreignKey: 'product_id', as: 'sales_products' });
  };

  return Products;
};

module.exports = productsModel;
