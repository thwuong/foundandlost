import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import notFound from "../assets/notfound.png";
function NotFound() {
  return (
    <div className="w-[80%] h-[80vh] mx-auto">
      <div className="container mx-auto">
        <div className="flex justify-center items-center py-20 ">
          <div className="w-[50%] flex justify-center items-center flex-col">
            <img src={notFound} alt="Not found" className="w-[60%]" />
            <h1 className="text-3xl font-bold">Không tìm thấy trang</h1>
            <p className="my-4 text-center font-medium">
              Chúng tôi xin lỗi. Trang bạn yêu cầu không thể được tìm thấy vui
              lòng quay lại trang chủ
            </p>
            <Link to={-1}>
              <Button colorScheme={"messenger"}>Quay về</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
