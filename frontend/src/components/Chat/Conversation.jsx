import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unSelectConversation } from "../../stores/ConversationSlice";
import Message from "./Message";
function Conversation(props) {
  const {
    sendMessage,
    currentConversation,
    newMessage,
    setNewMessage,
    messages,
  } = props;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [receiver, setReceiver] = useState(null);
  // Scroll
  const bottomAnchor = useRef();
  const scrollToBottom = () => {
    bottomAnchor.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (!currentConversation) return;
    setReceiver(
      [currentConversation?.firstUser, currentConversation?.secondUser].find(
        (u) => u?.id !== user.id
      )
    );
  }, [currentConversation?.id]);
  return (
    <div className="h-full">
      <div className="px-12 h-[12%] flex items-center bg-white shadow-xl">
        <figure>
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={receiver?.avatar}
            alt=""
          />
        </figure>
        <p className="ml-4 font-medium">{receiver?.fullName}</p>
        <p
          onClick={() => {
            dispatch(unSelectConversation());
          }}
          className="ml-auto w-8 h-8 flex items-center justify-center rounded-full border-gray-400 border cursor-pointer hover:bg-gray-100"
        >
          <box-icon name="x" color="gray"></box-icon>
        </p>
      </div>
      <div className="px-12 h-[76%] overflow-y-auto">
        {messages && messages?.length > 0
          ? messages.map((message, index) => {
              return <Message key={index} message={message} />;
            })
          : null}
        <div ref={bottomAnchor} className="anchor-bottom"></div>
      </div>
      <div className="flex justify-center items-center gap-4 py-4 px-12 h-[12%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(newMessage);
          }}
          className="w-full flex justify-between px-3 py-2 rounded-lg bg-white shadow-xl"
        >
          <input
            name="message"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            type="text"
            className="w-full outline-none"
            placeholder="Type something"
          />
          <button className="flex items-center">
            <box-icon name="send" type="solid" color="#2457C5"></box-icon>
          </button>
        </form>
        <figure>
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={user.avatar}
            alt=""
          />
        </figure>
      </div>
    </div>
  );
}

export default Conversation;
