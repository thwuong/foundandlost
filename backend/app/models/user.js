"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      code: {
        type: DataTypes.STRING,
        validate: { is: /([A-Z])+([0-9]{7})\b/ },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 8,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        },
      },
      avatar: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
