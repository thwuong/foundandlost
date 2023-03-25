const db = require("../models/index");
const { createError } = require("../utils/createError");
class NotificationController {
  // DESC create notification
  // @URL [POST] /api/notification/
  // body : [content,type]
  async createNotification(req, res, next) {
    const userId = req.user.userId;
    const { content, type, recieverId } = req.body;

    if (!content) return next(createError(401, "Trường nội dung bị bỏ trống!"));
    try {
      const newNotification = await db.Notification.create({
        content,
        type,
        recieverId,
        senderId: userId,
      });
      const notification = await db.Notification.findOne({
        where: { id: newNotification.id },
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
        message: "successfully!",
        notification,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC create message
  // @URL [DELETE] /api/notification/
  async deleteNotification(req, res, next) {
    const userId = req.user.userId;
    try {
      await db.Notification.destroy({
        recieverId: userId,
      });
      res.status(200).json({
        success: true,
        message: "successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC create message
  // @URL [GET] /api/message/
  async getNotifications(req, res, next) {
    const recieverId = req.params.recieverId;
    try {
      const notifications = await db.Notification.findAll({
        where: { recieverId },
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
        notifications,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
