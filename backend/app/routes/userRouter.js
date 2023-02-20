const Router = require("express").Router();
const UserController = require("../controllers/UserController");
const { verifyTokenAdmin, verifyToken } = require("../middlewares/verifyToken");
const upload = require("../utils/multer");
Router.put(
  "/profile/update",
  verifyToken,
  upload.single("avatar"),
  UserController.updateProfile
);
Router.get("/profile", verifyToken, UserController.getProfile);

Router.post("/create", verifyTokenAdmin, UserController.createUser);
Router.delete("/:id/delete", verifyTokenAdmin, UserController.removeUser);
Router.put("/:id/edit", verifyTokenAdmin, UserController.editUser);
Router.get("/:id", verifyToken, UserController.getUser);
Router.get("/", verifyTokenAdmin, UserController.getAllUser);

module.exports = Router;
