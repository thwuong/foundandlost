const Router = require("express").Router();
const PostController = require("../controllers/PostController");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");
const upload = require("../utils/multer");

Router.delete("/:id/delete", verifyTokenAdmin, PostController.deletePost);
Router.post(
  "/create",
  verifyToken,
  upload.array("images", 6),
  PostController.createPost
);
Router.put("/:id/update", verifyToken, PostController.updateStatusPost);
Router.get("/mypost", verifyToken, PostController.getMyPost);
Router.get("/limit", verifyToken, PostController.getPostLimit);
Router.get("/:id", verifyToken, PostController.getPost);
Router.get("/", verifyToken, PostController.getAllPost);

module.exports = Router;
