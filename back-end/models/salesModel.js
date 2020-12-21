const salesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      total_price: DataTypes.DECIMAL(9, 2),
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' });
    Sales.hasMany(models.sales_products, { foreignKey: 'sale_id', as: 'sales_products' });
  };

  return Sales;
};

module.exports = salesModel;
