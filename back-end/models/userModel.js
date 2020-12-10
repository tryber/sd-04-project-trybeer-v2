const Users = (sequelize, DataTpes) => sequelize
    .define('Users', {
        name: DataTpes.STRING,
        email: DataTpes.STRING,
        password: DataTpes.STRING,
        role: DataTpes.STRING,
    }, { 
        timestamps: false,
    });

module.exports = Users;
