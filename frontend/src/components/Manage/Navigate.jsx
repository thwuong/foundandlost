import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../api/authAPI";
function Navigate(props) {
  const dispatch = useDispatch();
  const { activeNav } = props;
  const handleLogout = async () => {
    await logout(dispatch);
  };
  return (
    <ul className="p-4 bg-gray-200 rounded-lg flex xl:flex-col flex-wrap gap-4">
      <Link to={"/manage"}>
        <li
          className={`my-2 py-2 px-4 text-sm flex items-center duration-300 xl:justify-between gap-5 bg-primary cursor-pointer rounded  
          ${
            activeNav === "statistic"
              ? "text-primary bg-white"
              : "text-white hover:bg-gray-500/50 hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="sm:block hidden font-bold">Thống Kê</span>
          <box-icon name="dashboard" type="solid" color={activeNav === "statistic" ? "#2457C5" : "white"}></box-icon>
        </li>
      </Link>
      <Link to={"/manage/account"}>
        <li
          className={`my-2 py-2 px-4 text-sm flex items-center duration-300 xl:justify-between gap-5 bg-primary cursor-pointer rounded  
          ${
            activeNav === "account"
              ? "text-primary bg-white"
              : "text-white hover:bg-gray-500/50 hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="sm:block hidden font-bold">Quản lý Tài khoản</span>
          <box-icon name="user" color={activeNav === "account" ? "#2457C5" : "white"}></box-icon>
        </li>
      </Link>
      <Link to={"/manage/post"}>
        <li
          className={`my-2 py-2 px-4 text-sm flex items-center duration-300 xl:justify-between gap-5  bg-primary cursor-pointer rounded  
          ${
            activeNav === "post"
              ? "text-primary bg-white"
              : "text-white hover:bg-gray-500/50 hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="sm:block hidden font-bold">Danh sách hồ sơ đồ vật</span>
          <box-icon name="news" color={activeNav === "post" ? "#2457C5" : "white"}></box-icon>
        </li>
      </Link>
      <Link to={"/manage/category"}>
        <li
          className={`my-2 py-2 px-4 text-sm flex items-center duration-300 xl:justify-between gap-5  bg-primary cursor-pointer rounded  
          ${
            activeNav === "category"
              ? "text-primary bg-white"
              : "text-white hover:bg-gray-500/50 hover:-translate-y-1 hover:shadow-xl"
          }`}
        >
          <span className="sm:block hidden font-bold">Quản lý Danh mục</span>
          <box-icon name="category" color={activeNav === "category" ? "#2457C5" : "white"}></box-icon>
        </li>
      </Link>
      <li
        onClick={handleLogout}
        className={`my-2 py-2 px-4 text-sm flex items-center duration-300 xl:justify-between gap-5  hover:bg-gray-500/50 bg-primary cursor-pointer rounded hover:-translate-y-1 hover:shadow-xl`}
      >
        <span className="text-white sm:block hidden font-bold">Đăng xuất</span>
        <box-icon name="exit" color="white"></box-icon>
      </li>
    </ul>
  );
}

export default Navigate;
