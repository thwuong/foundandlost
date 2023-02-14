const Router = require("express").Router();
const AuthController = require("../controllers/AuthController");

Router.post("/login", AuthController.login);

module.exports = Router;
