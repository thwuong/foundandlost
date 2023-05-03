import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unSelectConversation } from "../../stores/ConversationSlice";
import Message from "./Message";
import { getMessageList, postMessage } from "../../api/messageAPI";
import { pushNotify } from "../../api/notifyAPI";
function Conversation(props) {
  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.instanceSocket.socket);
  const currentConversation = useSelector((state) => state.conversation.currentConversation);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setArrMessage] = useState(null);
  const [reciever, setReciever] = useState(null);
  const bottomAnchor = useRef();
  const compareConversation = useRef(null);
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };
  // fetch messages
  const fetchMessages = async (conversationId) => {
    const data = await getMessageList(conversationId);
    setMessages(data.messages);
  };
  // send message
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const message = {
        senderId: user.id,
        message: newMessage,
        conversationId: currentConversation.id,
      };
      const data = await postMessage(message);
      socket.emit("sendMessage", data.messageItem);
      socket.emit("sendNotify", data.messageItem);
      setMessages([...messages, data.messageItem]);
    }
    setNewMessage("");
  };
  // recieve message
  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      setArrMessage(data);
    });
  }, []);
  useEffect(() => {
    if (arrMessage && arrMessage.conversationId === currentConversation.id) {
      setMessages([...messages, arrMessage]);
    }
  }, [arrMessage]);
  // Scroll

  const scrollToBottom = () => {
    bottomAnchor.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);
  // Scroll
  // get all messages

  useEffect(() => {
    if (!currentConversation) return;
    fetchMessages(currentConversation.id);
    setReciever([currentConversation?.firstUser, currentConversation?.secondUser].find((u) => u?.id !== user.id));
    compareConversation.current = currentConversation.id;
  }, [currentConversation]);
  return (
    <div className="h-full">
      <div className="px-12 h-[12%] flex items-center bg-white shadow-xl">
        <figure>
          <img className="w-8 h-8 object-cover rounded-full" src={reciever?.avatar} alt="" />
        </figure>
        <p className="ml-4 font-medium">{reciever?.fullName}</p>
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
        <div className="w-full flex justify-between px-3 py-2 rounded-lg bg-white shadow-xl">
          <input
            name="message"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            className="w-full outline-none"
            placeholder="gõ một cái gì đó"
          />
          <button className="flex items-center" onClick={sendMessage}>
            <box-icon name="send" type="solid" color="#2457C5"></box-icon>
          </button>
        </div>
        <figure>
          <img className="w-8 h-8 object-cover rounded-full" src={user.avatar} alt="" />
        </figure>
      </div>
    </div>
  );
}

export default Conversation;
