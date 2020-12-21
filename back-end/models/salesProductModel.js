const salesProductModel = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    'sales_products',
    {
      sale_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.sales, { foreignKey: 'sale_id', as: 'sales' });
    SalesProduct.belongsTo(models.products, { foreignKey: 'product_id', as: 'products' });
  };

  return SalesProduct;
};

module.exports = salesProductModel;
