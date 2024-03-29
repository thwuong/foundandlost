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
    const { categoryId, title, desc, location, postType, dateFoundLost } = req.body;
    const images = [];
    if (!title) return next(createError(400, "Vui lòng nhập tiêu đề"));
    if (!postType) return next(createError(400, "Vui lòng chọn loại bài viết"));

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
        dateFoundLost: dateFoundLost || null,
        postType,
        images,
      });
      res.status(200).json({
        success: true,
        message: "Đã đăng đồ vật",
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
        message: "Tải đồ vật thành công",
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
    const { keyword, postType, categoryId, _page, _limit, status, sort } = req.query;
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
        message: "Successful",
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllPostForStatistic(req, res, next) {
    const { selected } = req.query;
    const time = Number(selected);
    try {
      const posts = await db.Post.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(Date.now() - 60 * 60 * 24 * 1000 * time),
          },
        },
        raw: true,
      });
      res.status(200).json({
        success: true,
        message: "Successful",
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
        message: "Successful",
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
        message: "Successful",
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
  // @URL [DELETE] /api/post/:postId
  // params : [postId]
  // body [status]
  async updateStatusPost(req, res, next) {
    const id = req.params.postId;
    const status = req.body.status;
    if (!status) next(createError(400, "Vui lòng nhập trạng thái"));
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
  // DESC [delete a post]
  // @URL [DELETE] /api/post/:postId
  // params : [postId]
  // body [title,postType,categoryId,desc]
  // files [images]
  async editPost(req, res, next) {
    const id = req.params.postId;
    const { categoryId, title, desc, location, postType, oldImages, dateFoundLost } = req.body;
    const stringToArr = oldImages.split(",");
    const images = [];
    try {
      if (req.files) {
        for (const file of req.files) {
          const result = await uploadMultiple(file.path);
          images.push(result.url);
        }
      }
      let updatedPost = {
        categoryId,
        title,
        desc,
        location,
        dateFoundLost: dateFoundLost || null,
        postType,
        images: images.concat(stringToArr),
      };
      updatedPost = await db.Post.update(updatedPost, { where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã cập nhật thông tin đồ vật",
        updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
