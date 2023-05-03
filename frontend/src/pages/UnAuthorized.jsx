import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import unAuthorizred from "../assets/401ErrorUnauthorized.png";
import { useSelector } from "react-redux";
function UnAuthorized() {
  const user = useSelector((state) => state.auth.user);
  const path = user && user.isAdmin ? "/manage" : "/";
  return (
    <div className="w-4/5 h-[80vh] mx-auto">
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20 ">
          <div className="md:w-[50%] w-full flex justify-center items-center flex-col">
            <img src={unAuthorizred} alt="Not found" className="w-[60%]" />
            <h1 className="text-3xl font-bold">Không có quyền truy cập</h1>
            <p className="my-4 text-center font-medium">
              Chúng tôi xin lỗi. Tài khoản của bạn không có quyền truy cập vào trang bạn yêu cầu
            </p>
            <Link to={path}>
              <Button colorScheme={"messenger"}>Quay về</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;
