const Users = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return User;
};

module.exports = Users;
