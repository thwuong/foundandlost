import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function ClientSocket() {
  const { auth, instanceSocket } = useSelector((state) => state);
  const { user } = auth;
  const { socket } = instanceSocket;

  useEffect(() => {
    socket?.emit("addUser", user.id);

    return () => {
      socket?.emit("user disconnect", user.id);
    };
  }, [socket, user]);

  useEffect(() => {
    socket?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [socket, user]);

  return <></>;
}

export default ClientSocket;
