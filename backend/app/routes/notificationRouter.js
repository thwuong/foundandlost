const Router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, NotificationController.createNotification);
Router.delete(
  "/:notificationId",
  verifyToken,
  NotificationController.deleteNotification
);
Router.put(
  "/:notificationId",
  verifyToken,
  NotificationController.markNotification
);
Router.get("/", verifyToken, NotificationController.getNotifications);

module.exports = Router;
