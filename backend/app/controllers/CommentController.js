const db = require("../models/index");
const { createError } = require("../utils/createError");
class CommentController {
  // DESC [post a comment]
  // @URL [POST] /api/comment/
  // body : [content,postId,parentId]
  async postComment(req, res, next) {
    const userId = req.user.userId;
    const { content, postId, parentId } = req.body;
    if (!content) return next(createError(400, "Vui lòng nhập nội dung"));
    try {
      const comment = await db.Comment.create({
        userId,
        postId,
        parentId: parentId || null,
        content,
      });
      const newComment = await db.Comment.findByPk(comment.id, {
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "avatar"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Đã đăng bình luận",
        newComment,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [edit a comment]
  // @URL [PUT] /api/comment/:commentId
  // body : [content]
  async editComment(req, res, next) {
    const id = req.params.commentId;
    const content = req.body.content;
    if (!content) return next(createError(400, "Vui lòng nhập nội dung"));
    try {
      await db.Comment.update(
        { content },
        {
          where: { id },
        }
      );
      res.status(200).json({
        success: true,
        message: "Đã chỉnh sứa",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a comment]
  // @URL [POST] /api/comment/:commentId
  async deleteComment(req, res, next) {
    const id = req.params.commentId;
    try {
      await db.Comment.update({ parentId: null }, { where: { parentId: id } });
      await db.Comment.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        message: "Đã xóa",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC [delete a comment]
  // @URL [POST] /api/comment/
  // body: [postId]
  async getComments(req, res, next) {
    const postId = req.params.postId;
    try {
      const comments = await db.Comment.findAll({
        where: {
          postId,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "author",
            attributes: ["fullName", "email", "avatar"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Successful",
        comments,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
