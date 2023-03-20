import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postComment, deleteComment, editComment } from "../../api/commentAPI";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
function Comment() {
  const { postId } = useParams();
  const comments = useSelector((state) => state.comment.commentList);
  const [activeComment, setActiveComment] = useState(null);
  const dispatch = useDispatch();
  const parentComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const getReplies = (commentList, parentId) => {
    return commentList
      .filter((commentItem) => commentItem.parentId === parentId)
      .sort((a, b) => {
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  };
  const addComment = async (content, parentId) => {
    const { success } = await postComment(dispatch, {
      content,
      parentId,
      postId,
    });
    if (success) {
      setActiveComment(null);
      scrollToBottom();
    }
  };
  const removeComment = async (commentId) => {
    const verifyDelete = window.confirm("Xóa bình luận này!");
    if (verifyDelete) {
      const { success } = await deleteComment(dispatch, commentId);
      if (success) {
        setActiveComment(null);
      }
    }
  };
  const updateComment = async (content, commentId) => {
    const { success } = await editComment(dispatch, { content }, commentId);
    if (success) {
      setActiveComment(null);
    }
  };
  // Scroll
  const bottomAnchor = useRef();
  const scrollToBottom = () => {
    bottomAnchor.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="bg-black/10 rounded-lg p-4 max-h-[600px] overflow-y-auto">
        <p className="text-white">{comments && comments.length} bình luận</p>
        <CommentInput handleSubmit={addComment} />

        {parentComments && parentComments.length > 0 ? (
          parentComments.map((parentComment) => {
            return (
              <CommentItem
                key={parentComment.id}
                comment={parentComment}
                replies={getReplies(comments, parentComment.id)}
                removeComment={removeComment}
                updateComment={updateComment}
                addComment={addComment}
                getReplies={getReplies}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
              />
            );
          })
        ) : (
          <p>Chwua có</p>
        )}
        <div ref={bottomAnchor} className="anchor-bottom"></div>
      </div>
    </>
  );
}

export default Comment;
