const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.sale, { as: 'sale', foreignKey: 'user_id' });
  };
  return User;
};
module.exports = Users;
