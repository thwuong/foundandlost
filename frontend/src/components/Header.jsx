import logo from "../assets/header-logo_500_500.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../api/authAPI";
function Header(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    await logout(dispatch);
  };
  return (
    <div className="h-28 flex justify-between items-center">
      <Link to={"/"} className="h-full w-28">
        <figure className="block">
          <img src={logo} alt="logo" />
        </figure>
      </Link>
      <div className="flex items-center">
        <ul className="mr-10 flex gap-10">
          {user?.isAdmin ? (
            <Link to={"/manage/account"}>
              <li
                className={`text-lg font-medium  ${
                  activeTab === "manage" ? "text-primary" : "text-black"
                }`}
              >
                Quản Trị viên
              </li>
            </Link>
          ) : null}
          <Link to={"/"}>
            <li
              className={`text-lg font-medium ${
                activeTab === "home" ? "text-primary" : "text-black"
              }`}
            >
              Trang chủ
            </li>
          </Link>
        </ul>
        <div className="flex items-center relative group">
          <figure>
            <img
              src={user?.avatar}
              alt="Ảnh đại diện"
              className="w-8 h-8 object-cover overflow-hidden rounded-full cursor-pointer "
            />
          </figure>
          <div className="ml-2">
            <p className="text-primary font-bold">
              {user?.fullName} {user?.idNumber}
            </p>
            <p className="text-sm text-gray-500">
              {user?.isAdmin ? "Quản trị viên" : "Sinh viên"}
            </p>
          </div>
          <ul className="z-10 absolute overflow-hidden duration-300 top-6 w-full bg-white  rounded shadow-md opacity-0 invisible group-hover:top-12 group-hover:opacity-100 group-hover:visible">
            <Link to={"/profile"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon type="solid" name="user-account"></box-icon>
                <span>Thông tin cá nhân</span>
              </li>
            </Link>
            <Link to={"/profile/request"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon name="receipt"></box-icon>
                <span>Quản lý yêu cầu</span>
              </li>
            </Link>
            <Link to={"/chat"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon type="logo" name="messenger"></box-icon>
                <span>Tin Nhắn</span>
              </li>
            </Link>

            <li
              className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60 cursor-pointer"
              onClick={handleLogout}
            >
              <box-icon name="exit"></box-icon>
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
