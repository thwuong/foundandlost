import React from "react";

function Comment() {
  return (
    <div className="bg-black/10 rounded-lg p-4 mt-4">
      <ul>List comment</ul>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Nhập bình luận"
          className=" w-full px-4 py-1 rounded-lg bg-white outline-none"
        />
        <span className="absolute top-0 right-0 w-8 h-8 p-1 bg-white rounded-full flex items-center justify-center cursor-pointer">
          <box-icon name="send"></box-icon>
        </span>
      </div>
    </div>
  );
}

export default Comment;
