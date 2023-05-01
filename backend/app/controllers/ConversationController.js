const db = require("../models/index");
const { Op } = require("sequelize");
// const { createError } = require("../utils/createError");
class ConverstationController {
  // DESC Create a conversation
  // @URL [POST] /api/conversation/
  // body [receiver]
  async createConversation(req, res, next) {
    const { userId } = req.user;
    const reciever = req.body.reciever;

    try {
      const exitsConversation = await db.Conversation.findOne({
        where: {
          [Op.or]: [
            {
              firstUserId: userId,
              secondUserId: reciever,
            },
            {
              firstUserId: reciever,
              secondUserId: userId,
            },
          ],
        },
        nest: true,
        raw: true,
        include: [
          {
            model: db.User,
            as: "firstUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
          {
            model: db.User,
            as: "secondUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
        ],
      });
      if (exitsConversation) {
        return res.status(200).json({
          success: true,
          message: "Successful",
          conversation: exitsConversation,
        });
      }
      const newConversation = await db.Conversation.create({
        firstUserId: userId,
        secondUserId: reciever,
      });
      const conversation = await db.Conversation.findOne({
        where: {
          id: newConversation.id,
        },
        nest: true,
        raw: true,
        include: [
          {
            model: db.User,
            as: "firstUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
          {
            model: db.User,
            as: "secondUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Đã tạo cuộc hội thoại",
        conversation,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC get conversation
  // @URL [GET] /api/conversation/:userId
  async getConversation(req, res, next) {
    const userId = req.params.userId;
    try {
      const conversation = await db.Conversation.findOne({
        where: {
          [Op.or]: {
            firstUserId: userId,
            secondUserId: userId,
          },
        },
        nest: true,
        raw: true,
        include: [
          {
            model: db.User,
            as: "firstUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
          {
            model: db.User,
            as: "secondUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Successful",
        conversation,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC get conversation
  // @URL [GET] /api/conversation/
  async getConversations(req, res, next) {
    const { userId } = req.user;
    try {
      const conversations = await db.Conversation.findAll({
        where: {
          [Op.or]: {
            firstUserId: userId,
            secondUserId: userId,
          },
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "firstUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
          {
            model: db.User,
            as: "secondUser",
            attributes: ["fullName", "idNumber", "isAdmin", "avatar", "id"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "Successful",
        conversations,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC delete a conversation
  // @URL [DELETE] /api/conversation/:conversationId
  async deleteConversation(req, res, next) {
    const conversationId = req.params.conversationId;
    try {
      const deletedConversation = await db.Conversation.destroy({
        where: { id: conversationId },
      });
      res.status(200).json({
        success: true,
        message: "Đã xóa cuộc hội thoại",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConverstationController();
