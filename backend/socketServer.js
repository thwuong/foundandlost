let users = [];

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const addUser = (socketId, userId) => {
  users.some((user) => user.userId === userId)
    ? (users = users.map((user) => {
        if (user.userId === userId) {
          user.socketId = socketId;
        }
        return user;
      }))
    : users.push({ socketId, userId });
};
const removeUser = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

module.exports.socketServer = (socket) => {
  //when user login
  socket.on("addUser", (userId) => {
    console.log(`${userId} join`);
    addUser(socket.id, userId);
    socket.emit("getUsers", users);
    console.log(users);
  });
  //when user chat
  socket.on(
    "sendMessage",
    ({ senderId, recevierId, message, conversationId }) => {
      let user = getUser(recevierId);
      console.log(users);
      console.log(user?.socketId);
      socket.to(user?.socketId).emit("receiveMessage", {
        senderId,
        message,
        conversationId,
      });
    }
  );
  //when user post comment my post
  socket.on("sendComment", ({ senderId, recevierId, content }) => {
    let user = getUser(recevierId);
    console.log(users);
    console.log(user?.socketId);
    socket.to(user?.socketId).emit("receiveComment", {
      senderId,
      message,
      conversationId,
    });
  });
  //when user logout
  socket.on("user disconnect", (userId) => {
    console.log(`${userId} disconnect`);
    removeUser(userId);
    socket.emit("getUsers", users);
  });
};
