const Sales = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    'sales',
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      // },
      user_Id: {
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
  Sales.associate = (models) => {
    Sales.belongsTo(models.users, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return Sales;
};

module.exports = Sales;
