const Router = require("express").Router();
const UserController = require("../controllers/UserController");
const { adminPermision, verifyToken } = require("../middlewares/verifyToken");
const upload = require("../utils/multer");

Router.put("/profile", verifyToken, upload.single("avatar"), UserController.updateProfile);
Router.get("/:userId/full", verifyToken, UserController.getUserFullInfo);
Router.get("/profile", verifyToken, UserController.getProfile);
Router.get("/search", verifyToken, UserController.findUserByName);

Router.post("/", verifyToken, adminPermision, UserController.createUser);
Router.delete("/:userId", verifyToken, adminPermision, UserController.removeUser);
Router.put("/:userId", verifyToken, adminPermision, UserController.editUser);
Router.put("/", verifyToken, UserController.changePassword);
Router.get("/:userId", verifyToken, UserController.getUser);
Router.get("/", verifyToken, UserController.getAllUser);

module.exports = Router;
