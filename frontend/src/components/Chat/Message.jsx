import React from "react";

function Message(props) {
  const { message } = props;
  const user = 1;
  return (
    <div
      className={`flex gap-4 py-4 ${
        user !== message.sender ? "flex-row-reverse" : ""
      }`}
    >
      <figure>
        <img
          className="w-8 object-cover rounded-full"
          src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
          alt=""
        />
      </figure>
      <p
        className={`px-4 py-2 rounded-b-lg text-white ${
          user !== message.sender
            ? "rounded-tl-lg bg-gray-500"
            : "rounded-tr-lg bg-primary"
        }`}
      >
        {message.message}
      </p>
      <span className="text-sm text-gray-400">07:40 am</span>
    </div>
  );
}

export default Message;
