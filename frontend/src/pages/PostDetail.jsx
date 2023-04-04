import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentList } from "../api/commentAPI";
import { createConversation } from "../api/conversationAPI";
import { getItem } from "../api/postAPI";
import Comments from "../components/Comment/Comments";
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
    navigate("/chat");
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
        <div className="xl:flex-row flex-col flex gap-5 mt-6 xl:max-h-[500px] h-[80%] max-h-full">
          <div className="xl:w-3/4">
            <PostDetailItem
              item={post}
              handleSelectedChat={handleSelectedChat}
            />
          </div>
          <div className="xl:w-1/4">
            <RelatedPost
              typeName={post.category?.typeName}
              categoryId={post.categoryId}
            />
          </div>
        </div>
        <div className="xl:w-[73.5%] pt-4 h-full">
          <Comments />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
