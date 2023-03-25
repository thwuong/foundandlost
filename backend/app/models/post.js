"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      this.belongsTo(models.User, { foreignKey: "ownerId", as: "author" });
    }
  }
  Post.init(
    {
      ownerId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      location: DataTypes.STRING,
      postType: DataTypes.ENUM("Found item", "Lost item"),
      images: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.ENUM("pending", "confirmed"),
    },
    {
      hooks: {
        beforeDestroy: (post, options) => {
          console.log("post", post);
          console.log("options", options);
        },
      },
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
