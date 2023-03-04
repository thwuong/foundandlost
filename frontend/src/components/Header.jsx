import logo from "../assets/header-logo1.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header(props) {
  const { activeTab } = props;
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex justify-between items-center">
      <figure className="scale-110">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-36" />
        </Link>
      </figure>
      <div className="flex items-center">
        <ul className="mr-20 flex gap-10">
          <Link to={"/manage/account"}>
            <li
              className={`text-lg font-medium  ${
                activeTab === "manage" ? "text-primary" : "text-black"
              }`}
            >
              Quản lý tài khoản
            </li>
          </Link>
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
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt="Ảnh đại diện"
              className="w-8 h-8 overflow-hidden rounded-full cursor-pointer"
            />
            {/* <img src={user.avatar} alt="Ảnh đại diện" className="h-full" /> */}
          </figure>
          <div className="ml-2">
            <p className="text-primary font-bold">
              Dương Anh Thương B1906585
              {/* {user.fullName} {user.code} */}
            </p>
            <p className="text-sm text-gray-500">
              Sinh viên
              {/* {user.isAdmin ? "Quản trị viên" : "Sinh viên"} */}
            </p>
          </div>
          <ul className="absolute overflow-hidden duration-300 top-6 w-full bg-white  rounded shadow-md opacity-0 invisible group-hover:top-12 group-hover:opacity-100 group-hover:visible">
            <Link to={"/profile"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon type="solid" name="user-account"></box-icon>
                <span>Thông tin cá nhân</span>
              </li>
            </Link>
            <Link to={"/"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon name="receipt"></box-icon>
                <span>Quản lý yêu cầu</span>
              </li>
            </Link>
            <Link to={"/"}>
              <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                <box-icon name="exit"></box-icon>
                <span>Đăng xuất</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
