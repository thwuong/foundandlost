const http = require("http");
const { Server } = require("socket.io");
module.exports.serverSocket = (app) => {
  const server = http.createServer(app);

  const io = new Server(server);
  const users = [];
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("add user", (userId) => {});
    socket.emit("send message", (userId, message) => {});
    socket.emit("send message", (userId) => {});
  });
};
