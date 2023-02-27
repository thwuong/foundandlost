const db = require("../models/index");
const { createError } = require("../utils/createError");
const { Op } = require("sequelize");
const { uploadMultiple } = require("../utils/cloudinary");
class PostController {
  //  Route /api/post/create
  async createPost(req, res, next) {
    const userId = req.user.userId;
    const { categoryId, title, desc, location, postType } = req.body;
    const images = [];
    if (!title) return next(createError(400, "Trường tiêu đề bị bỏ trống!"));
    if (!postType)
      return next(createError(400, "Trường loại đồ vật bị bỏ trống!"));

    if (req.files) {
      for (const file of req.files) {
        const result = await uploadMultiple(file.path);
        images.push(result.url);
      }
    }
    try {
      const newPost = await db.Post.create({
        ownerId: userId,
        categoryId,
        title,
        desc,
        location,
        postType,
        images,
      });
      res.status(200).json({
        success: true,
        message: "Đăng đồ vật thành công!",
        newPost,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/:id
  async getPost(req, res, next) {
    const id = req.params.id;
    try {
      const post = await db.Post.findOne({
        where: { id },
        include: [
          { model: db.Category, as: "category", attributes: ["typeName"] },
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "phone", "avatar", "code"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "lấy thông tin đồ vật thành công!",
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/
  async getAllPost(req, res, next) {
    try {
      const posts = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Category, as: "category", attributes: ["typeName"] },
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "phone", "avatar"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Lấy danh sách đồ vật thành công!",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/limit
  //  Params : keyword,postType,categoryId,page
  async getPostLimit(req, res, next) {
    const { keyword, postType, categoryId, page } = req.query;
    let offset = !page || +page <= 1 ? 0 : +page - 1;
    const condition = {
      title: { [Op.regexp]: keyword || " " },
    };
    if (postType) condition.postType = postType;
    if (categoryId) condition.categoryId = +categoryId;

    try {
      const posts = await db.Post.findAndCountAll({
        where: condition,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        include: [
          { model: db.Category, as: "category", attributes: ["typeName"] },
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "phone", "avatar"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Lấy danh sách đồ vật thành công!",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/mypost
  async getMyPost(req, res, next) {
    const ownerId = req.user.userId;

    try {
      const myPosts = await db.Post.findAll({
        where: { ownerId },
      });

      res.status(200).json({
        success: true,
        message: "Nhận danh sách đồ vật của bạn thành công!",
        myPosts,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/:id/delete
  //  Params id
  async deletePost(req, res, next) {
    const id = req.params.id;

    try {
      const deletedPost = await db.Post.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Xóa đồ vật thành công!",
        deletedPost,
      });
    } catch (error) {
      next(error);
    }
  }
  //  Route /api/post/:id/update
  //  Params id
  //  Body status
  async updateStatusPost(req, res, next) {
    const id = req.params.id;
    const status = req.body.status;
    if (!status) next(createError(400, "Trường trạng thái trống!"));
    try {
      const updatedPost = await db.Post.update({ where: { id } }, { status });
      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái đồ vật thành công!",
        updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
