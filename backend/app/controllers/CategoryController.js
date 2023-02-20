const db = require("../models/index");
const { createError } = require("../utils/createError");

class CategoryController {
  async addCategory(req, res, next) {
    const typeName = req.body.typeName;
    if (!typeName) return next(createError(400, "Thiếu trường tên danh mục!"));
    try {
      const category = await db.Category.create({ typeName });

      res.status(200).json({
        success: true,
        message: "Tạo danh mục mới thành công!",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    const id = req.params.id;
    try {
      const category = await db.Category.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công!",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategory(req, res, next) {
    const id = req.params.id;
    const typeName = req.body.typeName;
    try {
      const category = await db.Category.update(
        { typeName },
        { where: { id } }
      );
      res.status(200).json({
        success: true,
        message: "Câp nhật danh mục thành công!",
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategory(req, res, next) {
    const id = req.params.id;
    try {
      const category = await db.Category.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Lấy danh mục thành công!",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      const categories = await db.Category.findAll({});
      res.status(200).json({
        success: true,
        message: "Tạo danh mục mới thành công!",
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
