const Sales = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
      delivery_number: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
      },
      sale_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Sale;
};

module.exports = Sales;
