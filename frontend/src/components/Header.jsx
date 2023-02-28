import logo from "../assets/header-logo1.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex justify-between items-center">
      <figure className="scale-110">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-36" />
        </Link>
      </figure>
      <div className="flex items-center">
        <ul className="mr-20">
          <li className="text-lg font-bold text-primary">
            <Link to={"/"}>Main page</Link>
          </li>
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
            <p className="text-primary font-medium">
              Dương Anh Thương B1906585
              {/* {user.fullName} {user.code} */}
            </p>
            <p className="text-sm text-paragarph-white">
              Sinh viên
              {/* {user.isAdmin ? "Quản trị viên" : "Sinh viên"} */}
            </p>
          </div>
          <ul className="absolute overflow-hidden duration-300 top-6 w-full bg-white  rounded shadow-md opacity-0 invisible group-hover:top-12 group-hover:opacity-100 group-hover:visible">
            <li className="p-2 text-ms font-medium hover:bg-primary hover:text-white">
              <Link to={"/"}>Thông tin cá nhân</Link>
            </li>
            <li className="p-2 text-ms font-medium hover:bg-primary hover:text-white">
              <Link to={"/"}>Quản lý yêu cầu</Link>
            </li>
            <li className="p-2 text-ms font-medium hover:bg-primary hover:text-white">
              <Link to={"/"}>Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;