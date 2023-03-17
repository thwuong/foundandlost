const Router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, CommentController.postComment);
Router.put("/:commentId", verifyToken, CommentController.editComment);
Router.delete("/:commentId", verifyToken, CommentController.deleteComment);
Router.get("/:postId", verifyToken, CommentController.getComments);

module.exports = Router;
