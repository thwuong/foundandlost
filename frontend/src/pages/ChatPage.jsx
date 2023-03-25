import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../customHooks/useLoading";
import ChatSkeleton from "../components/Loading/ChatSkeleton";
import Conversation from "../components/Chat/Conversation";
import UserChat from "../components/Chat/UserChat";
import Header from "../components/Header";
import { getConversationList } from "../api/conversationAPI";
import { getMessageList, postMessage } from "../api/messageAPI";
import {
  selectConversation,
  unSelectConversation,
} from "../stores/ConversationSlice";

function ChatPage() {
  const { auth, conversation, instanceSocket } = useSelector((state) => state);
  const { conversations, currentConversation } = conversation;
  const { user } = auth;
  const { socket } = instanceSocket;
  const [newMessage, setNewMessage] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const loading = useLoading();
  const selectedUser = (conversationId) => {
    dispatch(selectConversation(conversationId));
  };

  const sendMessage = async (newMessage) => {
    const recevierId = [
      currentConversation.firstUserId,
      currentConversation.secondUserId,
    ].find((recevier) => recevier !== user.id);

    socket.emit("sendMessage", {
      senderId: user.id,
      recevierId,
      message: newMessage,
      conversationId: currentConversation.id,
    });

    const message = {
      senderId: user.id,
      message: newMessage,
      conversationId: currentConversation.id,
    };
    const data = await postMessage(message);
    setMessages([...messages, data.messageItem]);
    setNewMessage("");
  };

  useEffect(() => {
    const fetchConversations = async () => {
      await getConversationList(dispatch);
    };
    fetchConversations();
    return () => {
      dispatch(unSelectConversation());
    };
  }, [user.id]);
  useEffect(() => {
    const fetchMessages = async (conversationId) => {
      const data = await getMessageList(conversationId);
      setMessages(data.messages);
    };
    if (!currentConversation?.id) return;
    fetchMessages(currentConversation.id);
  }, [currentConversation?.id]);

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      console.log("receive", data);
      if (!currentConversation) return;
      if (data.conversationId === currentConversation.id) {
        data.sender = [
          currentConversation?.firstUser,
          currentConversation?.secondUser,
        ].find((u) => u?.id !== user.id);
        setMessages([...messages, data]);
      }
    });
  });
  return (
    <div className="w-[80%] mx-auto">
      <div className="container mx-auto xl:h-screen h-[600px]">
        <Header />
        <div className="flex h-[83%] relative bg-gray-100 pb-2 shadow-2xl rounded-lg overflow-hidden">
          <div
            className="xl:w-3/4 md:w-4/6 w-full"
            onClick={() => {
              setIsShow(false);
            }}
          >
            {loading ? (
              <ChatSkeleton />
            ) : currentConversation?.id ? (
              <Conversation
                sendMessage={sendMessage}
                currentConversation={currentConversation}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                messages={messages}
              />
            ) : (
              <p className="text-date text-5xl text-center mt-[30%]">
                Open a conversation to start to chat.
              </p>
            )}
          </div>
          <p
            className="md:hidden absolute right-0 block text-right p-4 z-10 cursor-pointer"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <box-icon
              name={`${isShow ? "right-arrow-circle" : "menu-alt-right"}`}
              color="gray"
            ></box-icon>
          </p>
          <div
            className={`xl:w-1/4 md:w-2/6 md:static md:translate-x-0 md:h-full w-2/4 absolute h-[88%] right-0 top-14 overflow-hidden duration-300 bg-white
          ${isShow ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <div className="p-3 h-full">
              <div className="flex h-[8%] items-center gap-2 p-2 bg-gray-200 rounded-md">
                <box-icon name="search"></box-icon>
                <input
                  className="bg-gray-200 w-full outline-none text-gray-400 text-sm"
                  type="text"
                  name="message"
                  placeholder="Tìm kiếm..."
                />
              </div>

              <ul className="my-3 h-[92%] overflow-y-auto">
                {conversations &&
                  conversations.map((conversation, index) => {
                    return (
                      <UserChat
                        key={`c${index}`}
                        conversation={conversation}
                        currentConversation={currentConversation}
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
