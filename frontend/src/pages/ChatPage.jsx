import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationList, getConversation } from "../api/conversationAPI";
import { getMessageList, postMessage } from "../api/messageAPI";
import Conversation from "../components/Chat/Conversation";
import UserChat from "../components/Chat/UserChat";
import Header from "../components/Header";

function ChatPage() {
  const { auth, conversation } = useSelector((state) => state);
  const { conversations, selectedConversation } = conversation;
  const { user } = auth;
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const selectedUser = async (conversationId) => {
    getConversation(dispatch);
    await getMessageList(dispatch, conversationId);
  };
  const sendMessage = async (newMessage) => {
    const message = {
      sender: user.id,
      message: newMessage,
      conversationId: selectedConversation.id,
    };
    console.log(message);
    // await postMessage(dispatch, message );
  };
  useEffect(() => {
    const fetchConversations = async () => {
      await getConversationList(dispatch);
    };
    fetchConversations();
  }, []);
  return (
    <div className="w-[80%] mx-auto">
      <div className="container mx-auto h-screen">
        <Header />
        <div className="flex h-[83%] relative bg-gray-100 pb-2 shadow-2xl rounded-lg">
          <div className="w-[75%]">
            {selectedConversation ? (
              <Conversation
                sendMessage={sendMessage}
                selectedConversation={selectedConversation}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            ) : (
              <p className="text-date text-5xl text-center mt-[30%]">
                Open a conversation to start to chat.
              </p>
            )}
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
                {conversations &&
                  conversations.map((conversation) => {
                    return (
                      <UserChat
                        key={conversation.id}
                        conversation={conversation}
                        selectedConversation={selectedConversation}
                        selectedUser={selectedUser}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
