import logo from "../assets/logo.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="xl:container xl:w-[90%] xl:h-[68px] mx-auto">
      <div className="flex justify-between items-center">
        <figure className="h-[68px] w-[400px]">
          <Link to={"/"}>
            <img src={logo} alt="" className="h-full" />
          </Link>
        </figure>

        <div className="flex items-center">
          <ul className="mr-20">
            <li className="text-lg font-medium text-primary">
              <Link to={"/"}>Found and Lost List</Link>
            </li>
          </ul>
          <div className="flex items-center relative group">
            <figure className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
              <img src={user.avatar} alt="Ảnh đại diện" className="h-full" />
            </figure>
            <div className="ml-2">
              <p className="text-primary font-medium">
                {user.fullName} {user.code}
              </p>
              <p className="text-sm text-gray-500/50">
                {user.isAdmin ? "Quản trị viên" : "Sinh viên"}
              </p>
            </div>
            <ul className="absolute overflow-hidden duration-300 top-6 w-[180px] bg-white  rounded shadow-md opacity-0 invisible group-hover:top-12 group-hover:opacity-100 group-hover:visible">
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
    </div>
  );
}

export default Header;
