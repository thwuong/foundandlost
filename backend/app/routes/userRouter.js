const Router = require("express").Router();
const UserController = require("../controllers/UserController");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");

Router.post("/create", UserController.createUser);
Router.get("/", UserController.getAllUser);

module.exports = Router;
