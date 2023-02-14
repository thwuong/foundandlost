"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Request.init(
    {
      userId: DataTypes.UUID,
      postId: DataTypes.UUID,
      desc: DataTypes.STRING,
      status: DataTypes.ENUM("Đang chờ duyệt", "Đã Duyệt", "Từ Chối"),
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
