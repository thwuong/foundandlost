import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemList } from "../api/postAPI";
function RelatedPost(props) {
  const { typeName, categoryId } = props;
  const { post, posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPostRelated = async (categoryId) => {
      // Có vấn đề
      await getItemList(dispatch, { categoryId: categoryId });
    };
    fetchPostRelated(categoryId);
  }, [categoryId]);
  return (
    <div className="bg-black/10 p-4 rounded-lg h-full">
      <h3 className="text-xl text-center font-bold">Đồ vật liên quan</h3>
      <p className="mt-2 ml-2 text-sm text-primary font-bold">#{typeName}</p>
      <ul className="overflow-y-auto h-4/6 mt-4">
        {posts && posts.length > 0
          ? posts.map((postItem) => {
              if (post.id !== postItem.id) {
                return (
                  <li
                    key={postItem.id}
                    className="mt-2 flex items-center px-2 py-1 bg-primary/20 rounded gap-2"
                  >
                    <figure>
                      <img
                        className="flex-1 h-12 rounded object-cover"
                        src={postItem?.images[0]}
                        alt=""
                      />
                    </figure>
                    <div className="w-[80%]">
                      <h5 className="text-lg font-bold truncate">
                        {postItem?.title}
                      </h5>
                      <div className="flex items-center gap-2">
                        <box-icon name="map" color="#E5E7EB"></box-icon>
                        <span className="text-sm text-gray-200">
                          {postItem?.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <box-icon name="time" color="#E5E7EB"></box-icon>
                        <span className="text-sm text-gray-200">
                          {moment(postItem?.createdAt).fromNow()}
                        </span>
                      </div>
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
