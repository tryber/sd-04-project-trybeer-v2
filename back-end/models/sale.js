const Sale = (sequelize, DataTypes) => {
  const createSale = sequelize.define('sales', {
    userId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
    },
    saleDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

  createSale.associate = (models) => {
    // createSale.hasMany(models.salesProducts, { as: 'salesProducts', foreignKey: 'saleId' });

    createSale.belongsTo(models.users, { as: 'users', foreignKey: 'userId' });
  };
  return createSale;
};

module.exports = Sale;
