import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../customHooks/useLoading";
import ChatSkeleton from "../components/Loading/ChatSkeleton";
import Conversation from "../components/Chat/Conversation";
import UserChat from "../components/Chat/UserChat";
import Header from "../components/Header";
import {
  createConversation,
  getConversationList,
} from "../api/conversationAPI";
import { getMessageList, postMessage } from "../api/messageAPI";
import {
  selectConversation,
  unSelectConversation,
} from "../stores/ConversationSlice";
import { findUsers } from "../api/userAPI";

function ChatPage() {
  const { auth, conversation, instanceSocket } = useSelector((state) => state);
  const { conversations, currentConversation } = conversation;
  const { user } = auth;
  const { socket } = instanceSocket;
  const [newMessage, setNewMessage] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const timerSearching = useRef(null);
  const [userList, setUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const dispatch = useDispatch();
  const loading = useLoading();
  // choice user to chat
  const selectedUser = (conversationId) => {
    dispatch(selectConversation(conversationId));
  };
  // send message
  const sendMessage = async (newMessage) => {
    setNewMessage("");
    const message = {
      senderId: user.id,
      message: newMessage,
      conversationId: currentConversation.id,
    };
    const data = await postMessage(message);
    socket.emit("sendMessage", data.messageItem);
    setMessages([...messages, data.messageItem]);
  };
  // search users
  const searchingUser = (e) => {
    const value = e.target.value;

    clearTimeout(timerSearching.current);

    timerSearching.current = setTimeout(async () => {
      const data = await findUsers({ keyword: value });
      setUserList(data.users);
    }, 500);
  };
  //selected chat
  const handleSelectedChat = async (recieverId) => {
    await createConversation(dispatch, { reciever: recieverId });
  };
  //get all user conversation
  useEffect(() => {
    const fetchConversations = async () => {
      await getConversationList(dispatch);
    };
    fetchConversations();
    return () => {
      dispatch(unSelectConversation());
    };
  }, [user.id]);
  // recieve message
  useEffect(() => {
    socket?.on("recieveMessage", (data) => {
      if (
        !currentConversation ||
        data.conversationId !== currentConversation.id
      ) {
        // show notify
        console.log("show notify");
        console.log(data);
      } else {
        setMessages([...messages, data]);
      }
    });
  });
  // get all messages
  useEffect(() => {
    const fetchMessages = async (conversationId) => {
      const data = await getMessageList(conversationId);
      setMessages(data.messages);
    };

    if (!currentConversation) return;
    fetchMessages(currentConversation.id);
  }, [currentConversation]);
  return (
    <div className="w-[80%] mx-auto">
      <div className="container mx-auto xl:h-screen h-[600px]">
        <Header />
        <div className="flex h-[83%] relative bg-gray-100 pb-2 shadow-2xl rounded-lg overflow-hidden">
          <div
            className="xl:w-3/4 md:w-4/6 w-full"
            onClick={() => {
              setIsShow(false);
              setShowUserList(false);
            }}
          >
            {loading ? (
              <ChatSkeleton />
            ) : currentConversation ? (
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
              <div className="relative flex h-[8%] items-center gap-2 p-2 bg-gray-200 rounded-md">
                <box-icon name="search"></box-icon>
                <input
                  className="bg-gray-200 w-full outline-none text-gray-400 text-sm"
                  type="text"
                  name="users"
                  placeholder="Tìm kiếm..."
                  onChange={searchingUser}
                  onClick={() => {
                    setShowUserList(true);
                  }}
                />
                {showUserList && (
                  <ul
                    className={`absolute top-14 right-0 w-full bg-gray-200 shadow-xl duration-300 rounded py-2`}
                  >
                    {userList && userList.length > 0 ? (
                      userList.map((user) => {
                        return (
                          <li
                            onClick={() => {
                              handleSelectedChat(user.id);
                            }}
                            key={user.id}
                            className=" p-2 flex gap-2 items-center cursor-pointer duration-300 hover:bg-gray-300"
                          >
                            <img
                              src={user.avatar}
                              alt="asd"
                              className="w-8 h-8 object-cover rounded-full"
                            />
                            <span className="font-semibold">
                              {user.fullName + " " + user.idNumber}
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <li className=" p-2 flex gap-2 items-center cursor-pointer duration-300 hover:bg-gray-300">
                        <span className="font-semibold">
                          Gõ vào để tìm kiếm..
                        </span>
                      </li>
                    )}
                  </ul>
                )}
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
