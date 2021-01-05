const SalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  SaleProduct.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: "products",
      foreignKey: "sale_id",
      otherKey: "product_id",
      through: SaleProduct,
    });

    models.Products.belongsToMany(models.Sales, {
      as: "sales",
      foreignKey: "product_id",
      otherKey: "sale_id",
      through: SaleProduct,
    });
  };
  return SaleProduct;
};

module.exports = SalesProducts;
