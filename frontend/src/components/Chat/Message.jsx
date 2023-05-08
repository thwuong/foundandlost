import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
function Message(props) {
  const { message } = props;
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={`flex gap-4 py-4 ${user.id === message?.senderId ? "flex-row-reverse" : ""}`}>
      <figure>
        <img className="w-8 h-8 object-cover rounded-full" src={message?.sender?.avatar} alt="" />
      </figure>
      <p
        className={`px-4 py-2 rounded-b-lg text-white max-w-[40%] ${
          user.id !== message?.senderId ? "rounded-tl-lg bg-gray-500" : "rounded-tr-lg bg-primary"
        }`}
      >
        {message?.message}
      </p>
      <span className="text-sm text-gray-400">{moment(message?.createdAt).fromNow()}</span>
    </div>
  );
}

export default Message;
