const salesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: 'user_id',
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        field: 'total_price',
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        field: 'delivery_number',
      },
      saleDate: {
        type: DataTypes.DATE,
        field: 'sale_date',
      },
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' });
  };

  return Sales;
};

module.exports = salesModel;
