import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import PostForm from "../components/Form/PostForm";
import { getItem } from "../api/postAPI";
import { useParams } from "react-router-dom";

function EditPost() {
  const { post } = useSelector((state) => state.post);
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPostById = async (id) => {
      await getItem(dispatch, id);
    };
    post.id !== Number(postId) && fetchPostById(postId);
  }, [postId]);
  return (
    <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto overflow-hidden">
      <div className="container mx-auto">
        <Header />
        <PostForm isEdit={true} post={post} />
      </div>
    </div>
  );
}

export default EditPost;
