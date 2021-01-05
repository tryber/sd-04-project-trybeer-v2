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

  // Products.associate = (models) => {
  //   Products.belongsToMany(models.sales_products, { foreignKey: 'product_id', as: 'SalesProduct', through: Products, });
  // };

  return Products;
};

module.exports = productsModel;
