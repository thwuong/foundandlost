const Router = require("express").Router();
const ConversationController = require("../controllers/ConversationController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, ConversationController.createConversation);
Router.get(
  "/:conversationId",
  verifyToken,
  ConversationController.getConversation
);
Router.get("/", verifyToken, ConversationController.getConversations);

module.exports = Router;
