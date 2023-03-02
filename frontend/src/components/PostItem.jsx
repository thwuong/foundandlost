import React, { useState } from "react";
import { Badge } from "@chakra-ui/react";
function PostItem(props) {
  const [imageActive, setImageActive] = useState(0);
  const renderColorType = (type) => {
    return type === "Found item" ? "blue" : "purple";
  };
  return (
    <div className="flex gap-5 p-4 bg-black/10 rounded-lg">
      <div className="w-[50%]">
        <figure>
          <img
            className="w-full h-[300px]"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt=""
          />
        </figure>
        <div className="mt-6 flex justify-center items-center gap-5">
          <figure>
            <img
              className="w-16 h-16 object-cover"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
          </figure>
          <figure>
            <img
              className="w-16 h-16 object-cover"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
          </figure>
          <figure>
            <img
              className="w-16 h-16 object-cover"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
          </figure>
        </div>
      </div>
      <div className="w-[50%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <figure>
              <img
                className="w-8 h-8 rounded-full"
                src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
                alt=""
              />
            </figure>
            <p className="font-bold">Dương Anh Thương B1906585</p>
          </div>
          <p className="w-10 h-10 rounded-full p-1 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <box-icon type="logo" name="messenger"></box-icon>
          </p>
        </div>
        <h2 className="mt-2 text-2xl font-bold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          consequuntur dolorum rem est?
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <box-icon name="map" color="#E5E7EB"></box-icon>
          <span className="text-sm text-gray-200">
            Nhà học C1,Đại học cần thơ{" "}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <box-icon name="time" color="#E5E7EB"></box-icon>
          <span className="text-sm text-gray-200">
            {new Date(2312723423).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" colorScheme={renderColorType("Found item")}>
            Found item
          </Badge>
          <span className="text-primary text-sm font-bold">#{"Công nghệ"}</span>
        </div>
        <div className="mt-2">
          <p className="font-bold">Mô tả: </p>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            consectetur exercitationem modi voluptatibus, quis quibusdam
            assumenda recusandae eaque impedit nam.
          </span>
        </div>
        <p className="mt-2 font-bold">Liên hệ: </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <box-icon name="phone" color="#E5E7EB"></box-icon>
            <span className="text-sm text-gray-200">0794290085</span>
          </div>
          <div className="flex items-center gap-2">
            <box-icon name="envelope" color="#E5E7EB"></box-icon>
            <span className="text-sm text-gray-200">duongthuong@gmail.com</span>
          </div>
        </div>
        <p className="mt-2 px-2 ml-auto text-center cursor-pointer py-1 w-[30%] text-white bg-primary rounded hover:bg-primary/90">
          Gửi yêu cầu
        </p>
      </div>
    </div>
  );
}

export default PostItem;
