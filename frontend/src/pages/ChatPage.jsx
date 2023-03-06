import React from "react";
import Message from "../components/Chat/Message";
import Header from "../components/Header";

function ChatPage() {
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
    <div className="w-[80%] h-screen mx-auto">
      <div className="container mx-auto">
        <Header />
        <div className="flex max-h-screen relative">
          <div className="w-[80%] bg-gray-100 ">
            <div className="">
              <div className="px-12 h-16 flex items-center bg-white shadow-xl">
                <figure>
                  <img
                    className="w-8 object-cover rounded-full"
                    src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
                    alt=""
                  />
                </figure>
                <p className="ml-4 font-medium">Duong thuong</p>
                <p className="ml-auto w-8 h-8 flex items-center justify-center rounded-full border-gray-400 border cursor-pointer">
                  <box-icon name="x" color="gray"></box-icon>
                </p>
              </div>
              <div className="px-12 h-[60vh] overflow-y-auto">
                {messages.map((item) => {
                  return <Message message={item} />;
                })}
              </div>
              <div className="flex justify-center items-center gap-4 py-4 ">
                <div className="w-[80%] flex justify-between px-3 py-2 rounded-lg bg-white shadow-xl">
                  <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="Type something"
                  />
                  <box-icon name="send" type="solid" color="#2457C5"></box-icon>
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
          </div>

          <div className="w-[20%]">
            <div className="bg-rose-300 h-20">Nav chat</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
