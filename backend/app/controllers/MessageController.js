const db = require("../models/index");
const { createError } = require("../utils/createError");
class MessageController {
  // DESC create message
  // @URL [POST] /api/message/
  // body : [message,conversationId]
  async createMessage(req, res, next) {
    const userId = req.user.userId;
    const { message, conversationId } = req.body;

    if (!message) return next(createError(401, "Trường nội dung bị bỏ trống!"));
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
        include: {
          model: db.User,
          as: "sender",
          attributes: ["fullName", "avatar", "idNumber"],
        },
      });
      res.status(200).json({
        success: true,
        message: "Tạo tin nhắn thành công!",
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
        message: "Lấy tin nhắn thành công!",
        messages,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
