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
    SalesProduct.belongsTo(models.Sales, { foreignKey: 'sale_id', as: 'sales' });
    SalesProduct.belongsTo(models.Products, { foreignKey: 'product_id', as: 'products' });
  };

  return SalesProduct;
};

module.exports = salesProductModel;
