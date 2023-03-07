import React, { useState } from "react";
import Header from "../components/Header";
import { Select } from "@chakra-ui/react";
import PostTable from "../components/Manage/PostTable";
import Navigate from "../components/Manage/Navigate";
function ManagePost() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Tiêu đề",
      author: {
        fullName: "Dương Anh Thương",
        email: "Dthuong@gmail.com",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      },
      status: "pending",
      postType: "Lost item",
      location: "Ninh kiều, Cần thơ",
      createdAt: Date.now() - 10,
    },
    {
      id: 2,
      title: "Tiêu đề 2",
      author: {
        fullName: "Dương Anh Thương 2",
        email: "Dthuong2@gmail.com",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      },
      status: "confirmed",
      postType: "Found item",
      location: "Ninh kiều, Cần thơ",
      createdAt: Date.now() - 10,
    },
    {
      id: 3,
      title: "Tiêu đề 2",
      author: {
        fullName: "Dương Anh Thương 2",
        email: "Dthuong2@gmail.com",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      },
      status: "expired",
      postType: "Lost item",
      location: "Ninh kiều, Cần thơ",
      createdAt: Date.now() - 10,
    },
    {
      id: 3,
      title: "Tiêu đề 2",
      author: {
        fullName: "Dương Anh Thương 2",
        email: "Dthuong2@gmail.com",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      },
      status: "expired",
      postType: "Lost item",
      location: "Ninh kiều, Cần thơ",
      createdAt: Date.now() - 10,
    },
  ]);
  return (
    <div className="bg-main bg-no-repeat bg-cover">
      <div className="w-[80%] h-screen mx-auto">
        <Header activeTab="manage" />
        <h1 className="my-6 text-primary text-3xl text-center font-bold">
          QUẢN LÝ ĐỒ VẬT
        </h1>
        <div className="w-[15%] ml-auto mb-4">
          <Select placeholder="Ngày đăng" bgColor={"white"}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </Select>
        </div>
        <div className="flex gap-5 mt-6 h-[60%]">
          <div className="w-[20%]">
            <Navigate activeNav="post" />
          </div>
          <div className="w-[80%]">
            <div className="py-8 px-4 bg-white/20 rounded-lg overflow-y-auto">
              <PostTable dataList={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePost;
