module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
      role: DataTypes.STRING,
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    { timestamps: true },
  );

  users.associate = (models) => {
    users.hasMany(models.sales, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return users;
};
