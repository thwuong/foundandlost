const db = require("../models/index");
const { createError } = require("../utils/createError");
class NotificationController {
  // DESC create notification
  // @URL [POST] /api/notification/
  // body : [content,type]
  async createNotification(req, res, next) {
    const { content, type, recieverId, senderId } = req.body;

    try {
      const newNotification = await db.Notification.create({
        content,
        type,
        recieverId,
        senderId,
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
        message: "Successful",
        notification,
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC create message
  // @URL [DELETE] /api/notification/:notificationId
  async deleteNotification(req, res, next) {
    const userId = req.user.userId;
    const notificationId = req.params.notificationId;

    try {
      await db.Notification.destroy({
        where: {
          recieverId: userId,
          id: notificationId,
        },
      });
      res.status(200).json({
        success: true,
        message: "Đã gỡ thông báo",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC update notification
  // @URL [UPDATE] /api/notification/:notificationId
  async markNotification(req, res, next) {
    const userId = req.user.userId;
    const notificationId = req.params.notificationId;
    console.log(notificationId, userId);
    try {
      await db.Notification.update({ isRead: true }, { where: { id: notificationId, recieverId: userId } });
      res.status(200).json({
        success: true,
        message: "Successful",
      });
    } catch (error) {
      next(error);
    }
  }
  // DESC get notifications
  // @URL [GET] /api/message/
  async getNotifications(req, res, next) {
    const userId = req.user.userId;
    try {
      const notifications = await db.Notification.findAll({
        where: { recieverId: userId },
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
        message: "Successful",
        notifications,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
