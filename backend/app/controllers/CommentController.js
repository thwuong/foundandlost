const db = require("../models/index");
const { createError } = require("../utils/createError");
class CommentController {
  postComment(req, res, next) {}
  editComment(req, res, next) {}
  deleteComment(req, res, next) {}
  getComments(req, res, next) {}
}

module.exports = new CommentController();
