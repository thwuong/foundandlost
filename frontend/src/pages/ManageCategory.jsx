import React, { useState } from "react";
import Header from "../components/Header";
import CategogyTable from "../components/Manage/CategogyTable";
import Navigate from "../components/Manage/Navigate";
function ManageCategory() {
  const [category, setCategory] = useState([
    {
      id: 1,
      typeName: "Công nghệ",
    },
    {
      id: 2,
      typeName: "Sách, Vở",
    },
    {
      id: 3,
      typeName: "Trang sức",
    },
    {
      id: 4,
      typeName: "Ví, Túi",
    },
    {
      id: 5,
      typeName: "Khác",
    },
  ]);
  return (
    <div className="bg-main bg-no-repeat bg-cover">
      <div className="w-[80%] h-screen mx-auto">
        <Header activeTab="manage" />
        <h1 className="my-6 text-primary text-3xl text-center font-bold">
          QUẢN LÝ DANH MỤC ĐỒ VẬT
        </h1>
        <div className="px-3 py-2 w-44 ml-auto rounded duration-200 bg-primary flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/90">
          <span className="font-bold text-white">Tạo Danh mục</span>
          <box-icon name="user-plus" color="white"></box-icon>
        </div>
        <div className="flex gap-5 mt-4 h-3/5">
          <div className="w-[20%]">
            <Navigate activeNav="category" />
          </div>
          <div className="w-[80%] h-full">
            <div className="bg-white/20 rounded-lg max-h-full overflow-y-auto">
              <CategogyTable dataList={category} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCategory;
