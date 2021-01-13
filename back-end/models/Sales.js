const Sale = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sale', {
    total_price: DataTypes.INTEGER,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  Sales.associate = (models) => {
    Sales.belongsTo(models.user, { as: 'user', foreignKey: 'user_id' });
  };

  return Sales;
};

module.exports = Sale;
