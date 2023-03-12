import React from "react";
import Header from "../components/Header";
import PostForm from "../components/Form/PostForm";
function CreatePost() {
  return (
    <div className="xl:w-[80%] mx-auto">
      <div className="container mx-auto">
        <Header />
        <PostForm isEdit={false} />
      </div>
    </div>
  );
}

export default CreatePost;
