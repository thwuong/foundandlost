const Router = require("express").Router();
const AuthController = require("../controllers/AuthController");

Router.post("/login", AuthController.login);
Router.post("/refresh", AuthController.refreshToken);
Router.post("/logout", AuthController.logout);

module.exports = Router;
