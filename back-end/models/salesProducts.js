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
    createSalesProducts.belongsTo(models.products, {
      as: 'products',
      through: createSalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId' });

    createSalesProducts.belongsTo(models.sales, {
      as: 'sales',
      through: createSalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  createSalesProducts.removeAttribute('id');

  return createSalesProducts;
};

module.exports = salesProducts;
