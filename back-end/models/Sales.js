const createSales = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    'sales',
    {
      total_price: DataTypes.DECIMAL(9, 2),
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
      user_id: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
    },
  );

  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
  };

  return sales;
};

module.exports = createSales;
