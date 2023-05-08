import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@chakra-ui/react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import ExtraImage from "../assets/PlaceholderImage.png";
import { renderTypePost } from "../utils/renderColorStatus";
import { getItemList } from "../api/postAPI";
function RelatedPost(props) {
  const { typeName, categoryId } = props;
  const { post, posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPostRelated = async (categoryId) => {
      await getItemList(dispatch, { categoryId: categoryId });
    };
    fetchPostRelated(categoryId);
  }, [categoryId]);
  return (
    <div className="bg-gray-200 p-4 shadow rounded-lg h-full">
      <h3 className="text-xl text-center font-bold">Đồ vật liên quan</h3>
      <p className="mt-2 ml-2 text-sm text-primary font-bold">#{typeName}</p>
      <ul className="overflow-y-auto h-4/6 mt-4">
        {posts && posts.length > 0
          ? posts.map((postItem) => {
              if (post.id !== postItem.id) {
                return (
                  <li key={postItem.id} className="mt-2 flex items-center bg-white rounded gap-1">
                    <figure className="w-1/3">
                      <img
                        className="w-full h-20 rounded-tl rounded-bl object-cover"
                        src={postItem?.images[0] || ""}
                        alt=""
                        onError={(e) => {
                          e.target.src = ExtraImage;
                        }}
                      />
                    </figure>
                    <div className="w-2/3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" colorScheme={renderTypePost(postItem?.postType)}>
                          {postItem?.postType === "Found item" ? "Tìm thấy" : "Bị mất"}
                        </Badge>
                        <span className="text-sm text-date">{moment(postItem?.createdAt).fromNow()}</span>
                      </div>
                      <Link to={`/post/${postItem?.id}`}>
                        <h5 className="text-lg font-bold truncate hover:text-black/70">{postItem?.title}</h5>
                      </Link>
                    </div>
                  </li>
                );
              }
            })
          : null}
      </ul>
    </div>
  );
}

export default RelatedPost;
