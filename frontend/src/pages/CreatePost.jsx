import React from "react";
import Header from "../components/Header";
import PostForm from "../components/Form/PostForm";
function CreatePost() {
  return (
    <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto overflow-hidden">
      <div className="container mx-auto">
        <Header />
        <PostForm isEdit={false} />
      </div>
    </div>
  );
}

export default CreatePost;
