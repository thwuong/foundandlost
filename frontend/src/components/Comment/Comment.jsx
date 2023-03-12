import React from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

function Comment() {
  return (
    <div className="bg-black/10 rounded-lg p-4">
      <span className="text-white">30 Bình luận</span>
      <CommentInput />
      <ul className="mt-4">
        <CommentItem me={true} />
        <CommentItem children={<CommentItem />} />
      </ul>
    </div>
  );
}

export default Comment;
