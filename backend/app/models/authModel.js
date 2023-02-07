const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/connectDB");

const Auth = sequelize.define(
  "user",
  {
    iduser: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: /([A-Z])+([0-9]{7})\b/,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isManagement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    tableName: "user",
    timestamps: false,
  }
);

module.exports = Auth;
// `sequelize.define` also returns the model
