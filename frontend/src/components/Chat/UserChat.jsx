import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
function UserChat(props) {
  const { conversation, currentConversation, removeConversation, selectedUser } = props;
  const user = useSelector((state) => state.auth.user);

  const [showOption, setShowOption] = useState(false);
  const handleRemoveConversation = (e) => {
    e.stopPropagation();
    removeConversation(conversation.id);
    setShowOption(false);
  };
  const receiver = [conversation?.firstUser, conversation?.secondUser].find((u) => u?.id !== user.id);
  return (
    <li
      onClick={() => {
        selectedUser(conversation?.id);
      }}
      className={`relative flex items-start gap-1 px-2 py-4 cursor-pointer group ${
        conversation?.id === currentConversation?.id ? "rounded-md bg-primary text-white" : "border-b"
      }`}
    >
      <figure>
        <img className="w-8 h-8 object-cover rounded-full" src={receiver.avatar} alt="" />
      </figure>
      <div className="">
        <p className="font-bold leading-3">{receiver.fullName}</p>
        <span className="text-s  text-gray-400">{receiver.isAdmin ? "Quản trị viên" : "Sinh viên"}</span>
      </div>
      <p className="ml-auto text-s text-gray-400">{moment(conversation?.updatedAt).fromNow()}</p>
      <div className="absolute top-1/3 right-2 invisible group-hover:visible">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowOption(!showOption);
          }}
          className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 hover:bg-gray-300"
        >
          <box-icon name="dots-vertical-rounded"></box-icon>
        </span>
        {showOption && (
          <ul className="bg-white absolute right-5 z-50 rounded">
            <li
              onClick={handleRemoveConversation}
              className="flex items-center gap-4 bg-gray-400 hover:bg-gray-300 rounded py-1 px-2 text-white "
            >
              <box-icon name="trash-alt" color="white"></box-icon>
              Xóa
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

export default UserChat;
