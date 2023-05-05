import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileNav(props) {
  const { activeTab } = props;
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.user.profile);
  return (
    <ul className="flex">
      <Link to={"/profile"}>
        <li
          className={`relative duration-300 px-3 py-3 rounded cursor-pointer font-medium  ${
            activeTab === "post" ? " text-primary after-active" : "hover:bg-gray-200 text-gray-500"
          }`}
        >
          <span> Hồ sơ đồ vật</span>
        </li>
      </Link>
      {user.id === profile.id ? (
        <Link to={"/profile/request"}>
          <li
            className={`relative duration-300  px-3 py-3 rounded cursor-pointer font-medium  ${
              activeTab === "request" ? "text-primary after-active" : "hover:bg-gray-200 text-gray-500"
            }`}
          >
            <span> Yêu cầu</span>
          </li>
        </Link>
      ) : null}
    </ul>
  );
}

export default ProfileNav;
