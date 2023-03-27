import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
function UserChat(props) {
  const { conversation, currentConversation, selectedUser } = props;
  const user = useSelector((state) => state.auth.user);

  const receiver = [conversation?.firstUser, conversation?.secondUser].find(
    (u) => u?.id !== user.id
  );
  return (
    <li
      onClick={() => {
        selectedUser(conversation?.id);
      }}
      className={`flex items-start gap-1 px-2 py-4 cursor-pointer hover:bg-gray-200 ${
        conversation?.id === currentConversation?.id
          ? "rounded-md bg-primary text-white"
          : "border-b"
      }`}
    >
      <figure>
        <img
          className="w-8 h-8 object-cover rounded-full"
          src={receiver.avatar}
          alt=""
        />
      </figure>
      <div>
        <p className="font-bold leading-3">{receiver.fullName}</p>
        <span className="text-s  text-gray-400">
          {receiver.isAdmin ? "Quản trị viên" : "Sinh viên"}
        </span>
      </div>
      <p className="ml-auto text-s  text-gray-400">
        {moment(conversation?.updatedAt).fromNow()}
      </p>
    </li>
  );
}

export default UserChat;
