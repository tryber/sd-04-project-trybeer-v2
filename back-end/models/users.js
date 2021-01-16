const Users = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    User.hasMany(models.sales, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return User;
};

module.exports = Users;
