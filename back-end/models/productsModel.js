const productsModel = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      url_image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return Products;
};

module.exports = productsModel;
