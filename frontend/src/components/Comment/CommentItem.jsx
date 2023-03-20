import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import CommentInput from "./CommentInput";

function CommentItem(props) {
  const {
    children,
    comment,
    replies,
    activeComment,
    setActiveComment,
    getReplies,
    removeComment,
    addComment,
    updateComment,
    parentId = null,
  } = props;
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.comment.commentList);
  const replyId = parentId ? parentId : comment?.id;
  const isEdit =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "edit";
  const isReply =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "reply";
  return (
    <>
      <div className={`flex gap-2 mt-4 ${children ? "ml-10" : ""}`}>
        <figure>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={comment?.author?.avatar}
            alt=""
          />
        </figure>
        <div className="">
          <div className="p-2 rounded-2xl bg-white">
            <div className="flex justify-between">
              <p className="font-medium">{comment?.author?.fullName}</p>
            </div>
            {isEdit && (
              <CommentInput
                editInput={true}
                idInput={"idInput"}
                valueCurrent={comment.content}
                handleSubmit={(content) => updateComment(content, replyId)}
              />
            )}
            {!isEdit && <span>{comment?.content}</span>}
          </div>
          <div className="">
            {user.id !== comment?.userId ? (
              <label
                onClick={() => {
                  setActiveComment({ id: comment.id, type: "reply" });
                }}
                htmlFor="idInput"
                className="text-sm text-white cursor-pointer font-bold hover:underline"
              >
                Phản hồi
              </label>
            ) : (
              <>
                <span
                  onClick={() => {
                    removeComment(comment?.id);
                  }}
                  className="text-sm text-white ml-2 cursor-pointer"
                >
                  Xóa
                </span>
                <span
                  onClick={() => {
                    setActiveComment({ id: comment?.id, type: "edit" });
                  }}
                  className="text-sm text-white ml-2 cursor-pointer"
                >
                  Sửa
                </span>
              </>
            )}

            <span className="text-sm text-white ml-2">
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          {isReply && (
            <CommentInput
              idInput={"idInput"}
              handleSubmit={(content) => addComment(content, replyId)}
            />
          )}
        </div>
      </div>
      {replies && replies.length > 0
        ? replies.map((reply) => {
            return (
              <CommentItem
                comment={reply}
                key={reply.id}
                children={true}
                parentId={reply.id}
                addComment={addComment}
                removeComment={removeComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                getReplies={getReplies}
                replies={getReplies(replies, reply.id)}
              />
            );
          })
        : null}
    </>
  );
}

export default CommentItem;
