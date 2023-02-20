const Router = require("express").Router();
const AuthController = require("../controllers/AuthController");

Router.post("/login", AuthController.login);
Router.post("/refesh", AuthController.refeshToken);
Router.post("/logout", AuthController.logout);

module.exports = Router;
