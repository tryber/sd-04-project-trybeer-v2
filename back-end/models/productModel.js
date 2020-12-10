const Products = (sequelize, DataTpes) => sequelize
    .define('Products', {
        name: DataTpes.STRING,
        price: DataTpes.INTEGER,
        image: DataTpes.STRING,
    }, { 
        updateAt: false,
    });

module.exports = Products;
