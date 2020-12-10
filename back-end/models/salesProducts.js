module.exports = (sequelize, DataTypes) => {
  const sales_products = sequelize.define(
    'sales_products',
    {
      quantity: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return sales_products;
};
