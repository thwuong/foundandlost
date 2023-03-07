import React from "react";
import Conversation from "../components/Chat/Conversation";
import UserChat from "../components/Chat/UserChat";
import Header from "../components/Header";

function ChatPage() {
  return (
    <div className="w-[80%] mx-auto">
      <div className="container mx-auto h-screen">
        <Header />
        <div className="flex h-[83%] relative bg-gray-100 pb-2 shadow-2xl rounded-lg">
          <div className="w-[75%]">
            <Conversation />
          </div>
          <div className="w-[25%]">
            <div className="p-3 h-full">
              <div className="flex h-[8%] items-center gap-2 p-2 bg-gray-200 rounded-md">
                <box-icon name="search"></box-icon>
                <input
                  className="bg-gray-200 w-full outline-none text-gray-400 text-sm"
                  type="text"
                  name="message"
                  placeholder="Tìm kiếm tin nhắn"
                />
              </div>
              <ul className="my-3 h-[92%] overflow-y-auto">
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
