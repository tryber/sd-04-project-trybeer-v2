const createSales = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'sales',
    {
      total_price: DataTypes.FLOAT,
      user_id: { type: DataTypes.INTEGER, foreignKey: true },
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      status: DataTypes.STRING,
    },
    { timestamps: false },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Sales;
};

module.exports = createSales;
