import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../customHooks/useLoading";
import ChatSkeleton from "../components/Loading/ChatSkeleton";
import Conversation from "../components/Chat/Conversation";
import UserChat from "../components/Chat/UserChat";
import Header from "../components/Header";
import { createConversation, getConversationList } from "../api/conversationAPI";
import { selectConversation, unSelectConversation } from "../stores/ConversationSlice";
import { findUsers } from "../api/userAPI";
import { deleteConversation } from "../api/conversationAPI";

function ChatPage() {
  const { auth, conversation } = useSelector((state) => state);
  const { conversations, currentConversation } = conversation;
  const { user } = auth;
  const [isShow, setIsShow] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const timerSearching = useRef(null);
  const dispatch = useDispatch();
  const loading = useLoading();
  // choice user to chat
  const selectedUser = async (conversationId) => {
    await dispatch(selectConversation(conversationId));
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
  // remove conversation
  const removeConversation = async (conversationId) => {
    await deleteConversation(dispatch, conversationId);
    dispatch(unSelectConversation());
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

  return (
    <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto overflow-hidden">
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
              <Conversation />
            ) : (
              <p className="text-date text-5xl text-center mt-[30%]">Mở một cuộc trò chuyện để bắt đầu trò chuyện.</p>
            )}
          </div>
          <p
            className="md:hidden absolute right-0 block text-right p-4 z-10 sm:z-0 cursor-pointer"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <box-icon name={`${isShow ? "right-arrow-circle" : "menu-alt-right"}`} color="gray"></box-icon>
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
                  <ul className={`absolute top-14 right-0 w-full bg-gray-200 shadow-xl duration-300 rounded py-2 z-20`}>
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
                            <img src={user.avatar} alt="asd" className="w-8 h-8 object-cover rounded-full" />
                            <span className="font-semibold">{user.fullName + " " + user.idNumber}</span>
                          </li>
                        );
                      })
                    ) : (
                      <li className=" p-2 flex gap-2 items-center cursor-pointer duration-300 hover:bg-gray-300">
                        <span className="font-semibold">Gõ vào để tìm kiếm..</span>
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
                        removeConversation={removeConversation}
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
