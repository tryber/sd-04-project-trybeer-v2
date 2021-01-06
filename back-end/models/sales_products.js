const SalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false },
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: SaleProduct,
    });

    models.products.belongsToMany(models.Sale, {
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SaleProduct,
    });
  };
  return SaleProduct;
};

module.exports = SalesProducts;
