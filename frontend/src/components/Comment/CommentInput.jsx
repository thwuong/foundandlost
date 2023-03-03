import React from "react";

function CommentInput(props) {
  const { idInput } = props;
  return (
    <div className={`mt-2 relative `}>
      <input
        name="comment"
        id={idInput}
        type="text"
        placeholder="Nhập bình luận"
        className="w-full px-4 py-1 rounded-lg bg-white outline-none"
      />
      <span className="absolute top-0 right-0 w-8 h-8 p-1 bg-white rounded-full flex items-center justify-center cursor-pointer">
        <box-icon name="send" color="gray"></box-icon>
      </span>
    </div>
  );
}

export default CommentInput;
