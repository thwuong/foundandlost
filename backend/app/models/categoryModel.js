const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/connectDB");

const Category = sequelize.define(
  "categogy",
  {
    idCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "categogy",
    timestamps: false,
  }
);
module.exports = Category;
// `sequelize.define` also returns the model
