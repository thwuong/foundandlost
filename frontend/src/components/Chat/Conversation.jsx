import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
function Conversation(props) {
  const { sendMessage, selectedConversation, newMessage, setNewMessage } =
    props;
  const messages = useSelector((state) => state.message.messageList);
  // Scroll
  const bottomAnchor = useRef();
  const scrollToBottom = () => {
    bottomAnchor.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <div className="h-full">
      <div className="px-12 h-[12%] flex items-center bg-white shadow-xl">
        <figure>
          <img
            className="w-8 object-cover rounded-full"
            src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
            alt=""
          />
        </figure>
        <p className="ml-4 font-medium">Duong thuong</p>
        <p className="ml-auto w-8 h-8 flex items-center justify-center rounded-full border-gray-400 border cursor-pointer hover:bg-gray-100">
          <box-icon name="x" color="gray"></box-icon>
        </p>
      </div>
      <div className="px-12 h-[76%] overflow-y-auto">
        {messages && messages.length > 0
          ? messages.map((message) => {
              return <Message key={message.id} message={message} />;
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
            className="w-8 object-cover rounded-full"
            src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
            alt=""
          />
        </figure>
      </div>
    </div>
  );
}

export default Conversation;
