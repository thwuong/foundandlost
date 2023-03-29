import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import CommentInput from "./CommentInput";
function CommentItem(props) {
  const {
    comment,
    replies,
    activeComment,
    setActiveComment,
    getReplies,
    removeComment,
    addComment,
    updateComment,
    parentId = null,
    onOpen,
    onClose,
    isOpen,
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
      <div className={`flex gap-2 mt-4`}>
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
              <div>
                <CommentInput
                  editInput={true}
                  idInput={"idInput"}
                  valueCurrent={comment.content}
                  handleSubmit={(content) => updateComment(content, replyId)}
                />
                <span
                  onClick={() => {
                    setActiveComment(null);
                  }}
                  className="text-sm text-gray-500 cursor-pointer font-bold"
                >
                  Hủy
                </span>
              </div>
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
                  onClick={onOpen}
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
                <InstanceModal
                  show={isOpen}
                  modalName={"Xác nhận"}
                  hide={onClose}
                  content={
                    <VerifyModal
                      hide={onClose}
                      title={"Chắc chắn xóa bài viết này!"}
                      handleVerify={removeComment}
                      selectedId={comment?.id}
                    />
                  }
                />
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
      {replies.length > 0 && (
        <div className="ml-10">
          {replies.map((reply) => {
            return (
              <CommentItem
                comment={reply}
                key={reply.id}
                parentId={reply.id}
                addComment={addComment}
                removeComment={removeComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                getReplies={getReplies}
                replies={getReplies(comments, reply.id)}
                onOpen={onOpen}
                onClose={onClose}
                isOpen={isOpen}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default CommentItem;
