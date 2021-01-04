const salesProducts = (sequelize, DataTypes) => {
  const createSalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  createSalesProducts.associate = (models) => {
    createSalesProducts.belongsTo(models.products, { as: 'products', foreignKey: 'productId' });

    createSalesProducts.belongsTo(models.sales, { as: 'sales', foreignKey: 'saleId' });
  };
  return createSalesProducts;
};

module.exports = salesProducts;