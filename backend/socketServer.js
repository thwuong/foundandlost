const users = [];

module.exports.socketServer = (socket) => {
  socket.on("add user", (userId) => {
    console.log(userId);
  });
  socket.on("send message", (userId, message) => {});
};
