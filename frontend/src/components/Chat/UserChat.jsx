import React from "react";
import { useSelector } from "react-redux";
function UserChat(props) {
  const { conversation, selectedConversation, selectedUser } = props;
  const user = useSelector((state) => state.auth.user);
  return (
    <li
      onClick={() => {
        selectedUser(conversation?.id);
      }}
      className={`flex items-start gap-2 px-2 py-4 ${
        conversation?.id === selectedConversation
          ? "rounded-md bg-primary text-white"
          : "border-b"
      }`}
    >
      <figure>
        <img
          className="w-8 object-cover rounded-full"
          src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
          alt=""
        />
      </figure>
      <div>
        <p className="font-bold leading-3">
          {conversation?.firstUserId !== user.id
            ? conversation.firstUser.fullName
            : conversation.secondUser.fullName}
        </p>
        <span className="text-s  text-gray-200">
          {conversation?.firstUserId !== user.id &&
          conversation.firstUser.isAdmin
            ? "sinh vien"
            : conversation.secondUser.isAdmin
            ? "quan tri vien"
            : ""}
        </span>
      </div>
      <p className="ml-auto text-s  text-gray-200">11:23 am</p>
    </li>
  );
}

export default UserChat;
