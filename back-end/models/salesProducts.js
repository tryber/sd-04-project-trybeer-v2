const salesProducts = (sequelize, DataTypes) => {
  const createSalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  createSalesProducts.associate = (models) => {
    createSalesProducts.belongsToMany(models.products, {
      as: 'products',
      through: createSalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId' });

    createSalesProducts.belongsToMany(models.sales, {
      as: 'sales',
      through: createSalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  // createSalesProducts.removeAttribute('id');

  return createSalesProducts;
};

module.exports = salesProducts;
