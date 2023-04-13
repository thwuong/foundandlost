const Router = require("express").Router();
const ConversationController = require("../controllers/ConversationController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, ConversationController.createConversation);
Router.get(
  "/:conversationId",
  verifyToken,
  ConversationController.getConversation
);
Router.delete(
  "/:conversationId",
  verifyToken,
  ConversationController.deleteConversation
);
Router.get("/", verifyToken, ConversationController.getConversations);

module.exports = Router;
