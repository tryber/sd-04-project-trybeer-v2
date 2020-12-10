const Products = (sequelize, DataTpes) => sequelize
    .define('Products', {
        name: DataTpes.STRING,
        price: DataTpes.INTEGER,
        url_image: DataTpes.STRING,
    }, { 
        timestamps: false,
    });

module.exports = Products;
