const db = require("../models/index");
const { createError } = require("../utils/createError");
const { Op } = require("sequelize");
const { uploadMultiple } = require("../utils/cloudinary");
class PostController {
  // DESC Create a post
  // @URL [POST] /api/post/
  // body [categoryId, title, desc, location, postType]
  async createPost(req, res, next) {
    const userId = req.user.userId;
    const { categoryId, title, desc, location, postType } = req.body;
    const images = [];
    if (!title) return next(createError(400, "Trường tiêu đề bị bỏ trống!"));
    if (!postType)
      return next(createError(400, "Trường loại đồ vật bị bỏ trống!"));

    try {
      if (req.files) {
        for (const file of req.files) {
          const result = await uploadMultiple(file.path);
          images.push(result.url);
        }
      }

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
  // DESC Create a post
  // @URL [GET] /api/post/:postId
  async getPost(req, res, next) {
    const id = req.params.postId;
    try {
      const post = await db.Post.findOne({
        where: { id },
        include: [
          { model: db.Category, as: "category", attributes: ["typeName"] },
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "phone", "avatar", "idNumber"],
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
  // DESC [get all post]
  // @URL [GET] /api/post/
  // query : [keyword,postType,categoryId,page]
  async getAllPost(req, res, next) {
    const { keyword, postType, categoryId, _page, _limit, status, sort } =
      req.query;
    let offset = !_page || +_page <= 1 ? 0 : +_page - 1;
    const condition = {
      title: { [Op.regexp]: keyword || " " },
    };
    if (postType) condition.postType = postType;
    if (categoryId) condition.categoryId = +categoryId;
    if (status) condition.status = status;
    const order = sort ? [["createdAt", sort]] : [["createdAt", "DESC"]];
    try {
      const posts = await db.Post.findAndCountAll({
        where: condition,
        raw: true,
        nest: true,
        offset: offset * +_limit || offset * +process.env.LIMIT,
        limit: +_limit || +process.env.LIMIT,
        order,
        include: [
          {
            model: db.Category,
            as: "category",
            attributes: ["typeName"],
            nest: true,
          },
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "phone", "avatar"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Successfully",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get all my post]
  // @URL [GET] /api/post/mypost
  async getMyPost(req, res, next) {
    const ownerId = req.user.userId;

    try {
      const posts = await db.Post.findAll({
        where: { ownerId },
      });

      res.status(200).json({
        success: true,
        message: "Successfully",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [get all my post]
  // @URL [GET] /api/post/:userId/user
  // params : [userId]
  async getUserPost(req, res, next) {
    const ownerId = req.params.userId;

    try {
      const posts = await db.Post.findAll({
        where: { ownerId },
      });

      res.status(200).json({
        success: true,
        message: "Successfully",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a post]
  // @URL [DELETE] /api/post/:postId
  // params : [postId]
  async deletePost(req, res, next) {
    const id = req.params.postId;

    try {
      const deletedPost = await db.Post.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã xóa đồ vật",
        deletedPost,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a post]
  // @URL [DELETE] /api/post/:postId/comfirmed
  // params : [postId]
  async deleteConfirmedPost(req, res, next) {
    const id = req.params.postId;
    try {
      const deletedPost = await db.Post.destroy({
        where: { id, status: "confirmed" },
      });
      res.status(200).json({
        success: true,
        message: "Đã xóa đồ vật",
        deletedPost,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a post]
  // @URL [DELETE] /api/post/:postId
  // params : [postId]
  // body [status]
  async updateStatusPost(req, res, next) {
    const id = req.params.postId;
    const status = req.body.status;
    if (!status) next(createError(400, "Trường trạng thái bị bỏ trống!"));
    try {
      const updatedPost = await db.Post.update({ status }, { where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã cập nhật trạng thái",
        updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  async editPost(req, res, next) {
    const id = req.params.postId;
    const { categoryId, title, desc, location, postType, oldImages } = req.body;
    const images = [];
    let updatedPost = {
      categoryId,
      title,
      desc,
      location,
      postType,
    };
    try {
      if (req.files) {
        for (const file of req.files) {
          const result = await uploadMultiple(file.path);
          images.push(result.url);
        }
      }
      images.concat(oldImages);
      updatedPost.images = images;

      updatedPost = await db.Post.update({ updatedPost }, { where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã cập nhật trạng thái",
        updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
