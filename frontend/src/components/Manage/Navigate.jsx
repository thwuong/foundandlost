import React from "react";
import { Link } from "react-router-dom";
function Navigate(props) {
  const { activeNav } = props;
  return (
    <ul className="p-4 bg-white/20 rounded-lg">
      <Link to={"/manage/account"}>
        <li
          className={`my-3 py-2 px-4 flex items-center justify-between bg-primary cursor-pointer rounded  
          ${
            activeNav === "account"
              ? "shadow-xl translate-x-3"
              : "hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="text-white font-bold">Quản lý Tài khoản</span>
          <box-icon name="user" color="white"></box-icon>
        </li>
      </Link>
      <Link to={"/manage/post"}>
        <li
          className={`my-3 py-2 px-4 flex items-center justify-between bg-primary cursor-pointer rounded  
          ${
            activeNav === "post"
              ? "shadow-xl translate-x-3"
              : "hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="text-white font-bold">Quản lý Bài viết</span>
          <box-icon name="news" color="white"></box-icon>
        </li>
      </Link>
      <Link to={"/manage/category"}>
        <li
          className={`my-3 py-2 px-4 flex items-center justify-between bg-primary cursor-pointer rounded  
          ${
            activeNav === "category"
              ? "shadow-xl translate-x-3"
              : "hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="text-white font-bold">Quản lý Danh mục</span>
          <box-icon name="category" color="white"></box-icon>
        </li>
      </Link>
      <li
        className={`my-3 py-2 px-4 flex items-center justify-between bg-primary cursor-pointer rounded hover:-translate-y-1 hover:shadow-xl`}
      >
        <span className="text-white font-bold">Đăng xuất</span>
        <box-icon name="exit" color="white"></box-icon>
      </li>
    </ul>
  );
}

export default Navigate;
