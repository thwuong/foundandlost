const db = require("../models/index");
const { createError } = require("../utils/createError");

class CategoryController {
  // DESC [add a category]
  // @URL [POST] /api/category/
  // body : [typeName]
  async addCategory(req, res, next) {
    const typeName = req.body.typeName;
    if (!typeName) return next(createError(400, "Vui lòng nhập tên danh mục"));
    try {
      const category = await db.Category.create({ typeName });

      res.status(200).json({
        success: true,
        message: "Đã tạo danh mục",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a category]
  // @URL [DELETE] /api/category/:categoryId
  // param : [categoryId]
  async deleteCategory(req, res, next) {
    const id = req.params.categoryId;
    try {
      const category = await db.Category.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã xóa",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [update a category]
  // @URL [PUT] /api/category/:categoryId
  // param : [categoryId]
  // body : [typeName]
  async editCategory(req, res, next) {
    const id = req.params.categoryId;
    const typeName = req.body.typeName;
    if (!typeName) return next(createError(400, "Vui lòng nhập tên danh mục"));
    try {
      const category = await db.Category.update({ typeName }, { where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã cập nhật",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get a category]
  // @URL [GET] /api/category/:categoryId
  // param : [categoryId]
  async getCategory(req, res, next) {
    const id = req.params.categoryId;
    try {
      const category = await db.Category.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Successful",
        category,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get all category]
  // @URL [GET] /api/category/
  async getAllCategory(req, res, next) {
    try {
      const categories = await db.Category.findAll({});
      res.status(200).json({
        success: true,
        message: "Successful",
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
