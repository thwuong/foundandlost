const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const Category = require("./categoryModel");
const Post = sequelize.define(
  "post",
  {
    idPost: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idCategoy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Category,
        key: "idCategory",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "post",
  }
);
Post.belongsTo(Category);
module.exports = Post;
// `sequelize.define` also returns the model
