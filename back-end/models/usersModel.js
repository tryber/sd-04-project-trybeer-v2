const usersModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
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
    User.hasMany(models.sales, { foreignKey: 'user_id', as: 'sales' });
  };

  return User;
};

module.exports = usersModel;
