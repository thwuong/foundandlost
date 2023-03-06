import React from "react";
import Message from "./Message";
function Conversation(props) {
  const messages = [
    {
      sender: 1,
      message: "Become A travel Pro in one Day",
    },
    {
      sender: 1,
      message: "Become A travel Pro in one Day travel Pro in one Day 2",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
    {
      sender: 1,
      message: "Become A travel Pro in one Day travel ",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
    {
      sender: 2,
      message: "Test nha friend",
    },
  ];
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
        {messages.map((item) => {
          return <Message key={Math.random()} message={item} />;
        })}
      </div>
      <div className="flex justify-center items-center gap-4 py-4 px-12 h-[12%]">
        <div className="w-full flex justify-between px-3 py-2 rounded-lg bg-white shadow-xl">
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Type something"
          />
          <button className="flex items-center">
            <box-icon name="send" type="solid" color="#2457C5"></box-icon>
          </button>
        </div>
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
