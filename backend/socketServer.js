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
    ({ message, senderId, sender, conversation, conversationId }) => {
      const recieverId = [
        conversation.firstUserId,
        conversation.secondUserId,
      ].find((id) => id !== senderId);
      let user = getUser(recieverId);
      socket.to(user?.socketId).emit("recieveMessage", {
        senderId,
        message,
        conversationId,
        sender,
      });
    }
  );
  //when user post comment my post
  socket.on("sendComment", ({ senderId, recieverId, content }) => {
    let user = getUser(recieverId);
    console.log(users);
    console.log(user?.socketId);
    socket.to(user?.socketId).emit("recieveComment", {
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
