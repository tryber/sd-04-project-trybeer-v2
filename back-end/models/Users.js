const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
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

  Users.associate = (models) => {
    Users.hasMany(models.sales, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return Users;
};

module.exports = createUsers;
