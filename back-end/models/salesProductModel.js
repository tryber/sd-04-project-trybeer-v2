const salesProductModel = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'sales_products',
    {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  SalesProduct.associate = (models) => {
    models.sales.belongsToMany(models.sales, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    models.products.belongsToMany(models.products, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };

  return SalesProduct;
};

module.exports = salesProductModel;
