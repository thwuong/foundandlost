import React, { useEffect, useState } from "react";

function CommentInput(props) {
  const { idInput, handleSubmit, valueCurrent, editInput } = props;
  const [content, setContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (content) {
      handleSubmit(content);
      setContent("");
    }
  };
  useEffect(() => {
    if (editInput) {
      setContent(valueCurrent);
    }
  }, [editInput]);
  return (
    <form className={`mt-2 relative `}>
      <input
        name="comment"
        id={idInput}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        type="text"
        placeholder="Nhập bình luận"
        className="w-full px-4 py-1 rounded-lg bg-white outline-none"
      />
      <span
        onClick={onSubmit}
        className="absolute top-0 right-0 w-8 h-8 p-1 bg-inherit rounded-full flex items-center justify-center cursor-pointer"
      >
        <box-icon name="send" color="gray"></box-icon>
      </span>
    </form>
  );
}

export default CommentInput;
