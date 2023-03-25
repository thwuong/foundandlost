const Router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");
const { verifyToken } = require("../middlewares/verifyToken");

Router.post("/", verifyToken, NotificationController.createNotification);
Router.delete("/", verifyToken, NotificationController.deleteNotification);
Router.get("/", verifyToken, NotificationController.getNotifications);

module.exports = Router;
