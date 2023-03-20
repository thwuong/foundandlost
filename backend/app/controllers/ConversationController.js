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
      const exist = await db.Conversation.findOne({
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
      });
      if (exist) return next(createError(400, "This conversation is existed"));
      const newConversation = await db.Conversation.create({
        firstUserId: userId,
        secondUserId: receiver,
      });

      res.status(200).json({
        success: true,
        message: "Created conversation succeffully!",
        newConversation,
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
      const converstions = await db.Conversation.findAll({
        where: {
          [Op.or]: {
            firstUserId: userId,
            secondUserId: userId,
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "got conversations succeffully!",
        converstions,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConverstationController();
