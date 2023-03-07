import Comment from "../components/Comment/Comment";
import Header from "../components/Header";
import PostDetailItem from "../components/PostDetailItem";
import RelatedPost from "../components/RelatedPost";
function PostDetail() {
  return (
    <div className="bg-main bg-no-repeat bg-cover">
      <div className="w-[80%] min-h-screen mx-auto pb-4">
        <Header />
        <h1 className="mt-6 text-3xl text-primary text-center font-bold">
          CHI TIẾT ĐỒ VẬT
        </h1>
        <div className="flex gap-5 mt-6 ">
          <div className="w-[75%]">
            <PostDetailItem />
          </div>
          <div className="w-[25%]">
            <RelatedPost />
          </div>
        </div>
        <div className="w-[73.5%]">
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
