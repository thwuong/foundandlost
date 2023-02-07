const Router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const { verifyAdmin } = require("../middlewares/verifyToken");

Router.post("/create", verifyAdmin, AuthController.createUser);
Router.post("/login", AuthController.login);
Router.get("/", AuthController.getAllUser);

module.exports = Router;
