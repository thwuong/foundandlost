const db = require("../models/index");
const { Op } = require("sequelize");
const { createError } = require("../utils/createError");
class ConverstationController {
  // DESC Create a conversation
  // @URL [POST] /api/conversation/
  // body [receiver]
  async createConversation(req, res, next) {
    const { userId } = req.user;
    const receiver = req.body.receiver;

    try {
      const exitsConversation = await db.Conversation.findOne({
        where: {
          [Op.or]: [
            {
              firstUserId: userId,
              secondUserId: receiver,
            },
            {
              firstUserId: receiver,
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
          message: "succeffully!",
          conversation: exitsConversation,
        });
      }
      const newConversation = await db.Conversation.create({
        firstUserId: userId,
        secondUserId: receiver,
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
        message: "Created conversation succeffully!",
        conversation,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC get conversation
  // @URL [GET] /api/conversation/:conversationId
  async getConversation(req, res, next) {
    const { userId } = req.user;
    try {
      const converstion = await db.Conversation.findOne({
        where: {
          [Op.or]: {
            firstUserId: userId,
            secondUserId: userId,
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "got conversation succeffully!",
        converstion,
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
        message: "got conversations succeffully!",
        conversations,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConverstationController();
