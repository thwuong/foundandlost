import React from "react";
import Header from "../components/Header";
import PostForm from "../components/Form/PostForm";
function CreatePost() {
  return (
    <div className="w-4/5 mx-auto">
      <div className="container mx-auto">
        <Header />
        <PostForm isEdit={false} />
      </div>
    </div>
  );
}

export default CreatePost;
