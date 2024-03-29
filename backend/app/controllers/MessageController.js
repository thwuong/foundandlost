const db = require("../models/index");
const { createError } = require("../utils/createError");
class MessageController {
  // DESC create message
  // @URL [POST] /api/message/
  // body : [message,conversationId]
  async createMessage(req, res, next) {
    const userId = req.user.userId;
    const { message, conversationId } = req.body;

    if (!message) return next(createError(401, "Vui lòng nhập nội dung"));
    try {
      const newMessage = await db.Message.create({
        message,
        conversationId,
        senderId: userId,
      });
      const messageItem = await db.Message.findOne({
        where: { id: newMessage.id },
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "sender",
            attributes: ["fullName", "avatar", "idNumber"],
          },
          {
            model: db.Conversation,
            as: "conversation",
            attributes: ["firstUserId", "secondUserId"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Đã gửi tin nhắn",
        messageItem,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC create message
  // @URL [GET] /api/message/
  // body : [conversationId]
  async getMessages(req, res, next) {
    const conversationId = req.params.conversationId;
    try {
      const messages = await db.Message.findAll({
        where: { conversationId },
        raw: true,
        nest: true,
        include: {
          model: db.User,
          as: "sender",
          attributes: ["fullName", "avatar", "idNumber"],
        },
      });

      res.status(200).json({
        success: true,
        message: "Tải tin nhắn thành công",
        messages,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
