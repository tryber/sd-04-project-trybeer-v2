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
      urlImage: {
        type: DataTypes.STRING,
        field: 'url_image',
      },
    },
    {
      timestamps: false,
    },
  );

  return Products;
};

module.exports = productsModel;
