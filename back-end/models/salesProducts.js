module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    'sales_products',
    {
      quantity: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return salesProducts;
};
