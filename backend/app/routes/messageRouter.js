const Router = require("express").Router();
const MessageController = require("../controllers/MessageController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, MessageController.createMessage);
Router.get("/:conversationId", verifyToken, MessageController.getMessages);

module.exports = Router;
