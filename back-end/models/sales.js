module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define(
    'sales',
    {
      total_price: DataTypes.INTEGER,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: false },
  );

  sales.associate = (models) => {
    sales.belongsToMany(models.products, {
      through: models.sales_products,
    });

    sales.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return sales;
};
