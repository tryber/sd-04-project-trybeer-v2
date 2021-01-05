const createSalesProducts = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    'salesProducts',
    {
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return salesProducts;
};

module.exports = createSalesProducts;
