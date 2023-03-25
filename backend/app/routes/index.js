// Start Routes
module.exports.createRoute = (app) => {
  app.use("/api/user", require("./userRouter"));
  app.use("/api/auth", require("./authRouter"));
  app.use("/api/category", require("./categoryRouter"));
  app.use("/api/post", require("./postRouter"));
  app.use("/api/request", require("./requestRouter"));
  app.use("/api/comment", require("./commentRouter"));
  app.use("/api/message", require("./messageRouter"));
  app.use("/api/conversation", require("./conversationRouter"));
  app.use("/api/notification", require("./notificationRouter"));
};
// End Routes
