const User = (sequelize, DataTypes) => {
  const createUser = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [12],
          msg: '"displayName" length must be at least 12 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: '"email" must be a valid email',
        },
        notEmpty: {
          msg: '"email" is not allowed to be empty',
        },
        notNull: {
          msg: '"email" is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: '"password" length must be 6 characters long',
        },
        notEmpty: {
          msg: '"password" is not allowed to be empty',
        },
        notNull: {
          msg: '"password" is required',
        },
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

  createUser.associate = (models) => {
    createUser.hasMany(models.sales, { as: 'sales', foreignKey: 'userId' });
  };
  return createUser;
};

module.exports = User;
