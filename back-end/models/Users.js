const usersModel = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return users;
};

module.exports = usersModel;
