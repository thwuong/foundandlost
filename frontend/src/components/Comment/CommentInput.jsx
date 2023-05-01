import React, { useEffect, useState } from "react";

function CommentInput(props) {
  const { idInput, handleSubmit, valueCurrent, editInput } = props;
  const [content, setContent] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      handleSubmit(content);
      setContent("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOnSubmit(e);
    }
  };
  useEffect(() => {
    if (editInput) {
      setContent(valueCurrent);
    }
  }, [editInput]);
  return (
    <form className={`mt-2 relative flex items-center bg-white rounded-lg`} onSubmit={handleOnSubmit}>
      <input
        name="comment"
        id={idInput}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Nhập bình luận"
        className="w-full px-4 py-1 rounded-lg bg-white outline-none"
      />
      <button
        type="submit"
        className="w-8 h-8 p-1 bg-inherit rounded-full flex items-center justify-center cursor-pointer"
      >
        <box-icon name="send" color="gray"></box-icon>
      </button>
    </form>
  );
}

export default CommentInput;
