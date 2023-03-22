import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentList } from "../api/commentAPI";
import { createConversation } from "../api/conversationAPI";
import { getItem } from "../api/postAPI";
import Comment from "../components/Comment/Comment";
import Header from "../components/Header";
import PostDetailItem from "../components/PostDetailItem";
import RelatedPost from "../components/RelatedPost";
function PostDetail() {
  const { postId } = useParams();
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectedChat = async (receiverId) => {
    await createConversation(dispatch, { receiver: receiverId });
    setTimeout(() => {
      navigate("/chat");
    }, 1000);
  };

  useEffect(() => {
    const fetchComment = async (postId) => {
      await getCommentList(dispatch, postId);
    };
    const fetchItem = async (postId) => {
      await getItem(dispatch, postId);
    };
    fetchItem(postId);
    fetchComment(postId);
  }, [postId]);
  return (
    <div className="bg-main bg-no-repeat bg-cover min-h-screen">
      <div className="w-4/5 mx-auto pb-4 h-full">
        <Header />
        <h1 className="mt-6 text-3xl text-primary text-center font-bold">
          CHI TIẾT ĐỒ VẬT
        </h1>
        <div className="flex gap-5 mt-6 max-h-[500px] h-[80%]">
          <div className="w-[75%]">
            <PostDetailItem
              item={post}
              handleSelectedChat={handleSelectedChat}
            />
          </div>
          <div className="w-[25%]">
            <RelatedPost
              typeName={post.category?.typeName}
              categoryId={post.categoryId}
            />
          </div>
        </div>
        <div className="w-[73.5%] mt-4 h-full">
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
