const Router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/:postId/create", verifyToken, CommentController.postComment);
Router.put("/:id/edit", verifyToken, CommentController.editComment);
Router.delete("/:id/delete", verifyToken, CommentController.deleteComment);
Router.get("/:postId", verifyToken, CommentController.getComments);

module.exports = Router;
