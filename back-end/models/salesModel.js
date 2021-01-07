const salesModel = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'sales',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      // createdAt: 'sale_date',
      // updatedAt: false,
      // deletedAt: false,
    },
  );

  Sales.associate = (models) => {
    Sales.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' });
  };

  return Sales;
};

module.exports = salesModel;
