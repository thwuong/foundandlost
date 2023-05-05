const Router = require("express").Router();
const PostController = require("../controllers/PostController");
const { verifyToken, adminPermision } = require("../middlewares/verifyToken");
const upload = require("../utils/multer");

Router.delete("/:postId", verifyToken, PostController.deletePost);
Router.post("/", verifyToken, upload.array("images", 6), PostController.createPost);
Router.put("/:postId", verifyToken, upload.array("images", 6), PostController.editPost);
Router.put("/:postId/status", verifyToken, PostController.updateStatusPost);
Router.get("/:userId/user", verifyToken, PostController.getUserPost);
Router.get("/mypost", verifyToken, PostController.getMyPost);
Router.get("/statistical", verifyToken, PostController.getAllPostForStatistic);
Router.get("/:postId", verifyToken, PostController.getPost);
Router.get("/", verifyToken, PostController.getAllPost);

module.exports = Router;
