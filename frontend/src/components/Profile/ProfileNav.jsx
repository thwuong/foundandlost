import React from "react";
import { Link } from "react-router-dom";

function ProfileNav(props) {
  const { activeTab } = props;
  return (
    <ul className="flex">
      <Link to={"/profile"}>
        <li
          className={`relative duration-300 px-3 py-3 rounded cursor-pointer font-medium  ${
            activeTab === "post"
              ? " text-primary after-active"
              : "hover:bg-gray-200 text-gray-500"
          }`}
        >
          <span> Bài viết</span>
        </li>
      </Link>
      <Link to={"/profile/request"}>
        <li
          className={`relative duration-300  px-3 py-3 rounded cursor-pointer font-medium  ${
            activeTab === "request"
              ? "text-primary after-active"
              : "hover:bg-gray-200 text-gray-500"
          }`}
        >
          <span> Yêu cầu</span>
        </li>
      </Link>
    </ul>
  );
}

export default ProfileNav;
