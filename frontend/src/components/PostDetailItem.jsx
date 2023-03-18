import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@chakra-ui/react";
import { renderTypePost } from "../utils/renderColorStatus";
import moment from "moment";
function PostItem(props) {
  const { item } = props;
  const [imageActive, setImageActive] = useState(null);
  useEffect(() => {
    setImageActive(() => {
      if (item?.images && item?.images.length > 0) {
        return item?.images[0];
      }
      return " ";
    });
  }, [item]);
  console.log(item);
  return (
    <div className="flex gap-5 p-4 bg-black/10 rounded-lg">
      <div className="w-[50%]">
        <figure>
          <img
            className="w-full h-[380px] object-contain"
            src={imageActive}
            alt=""
          />
        </figure>

        <div className="mt-6 flex justify-center items-center gap-5">
          {item?.images && item?.images.length > 0
            ? item.images.map((image, index) => {
                return (
                  <figure
                    onClick={() => {
                      setImageActive(image);
                    }}
                    key={index}
                    className={`${imageActive === image ? "border-2" : ""}`}
                  >
                    <img
                      className="w-16 h-16 object-cover cursor-pointer"
                      src={image}
                      alt=""
                    />
                  </figure>
                );
              })
            : null}
        </div>
      </div>
      <div className="w-[50%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <figure>
              <img
                className="w-8 h-8 rounded-full"
                src={item?.author?.avatar}
                alt=""
              />
            </figure>
            <Link to={`/profile/${item?.ownerId}`}>
              <p className="font-bold">
                {item?.author?.fullName + " " + item?.author?.idNumber}
              </p>
            </Link>
          </div>
          <p className="w-10 h-10 rounded-full p-1 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <box-icon type="logo" name="messenger"></box-icon>
          </p>
        </div>
        <h2 className="mt-2 text-2xl font-bold">{item?.title}</h2>
        <div className="mt-2 flex items-center gap-2">
          <box-icon name="map" color="#E5E7EB"></box-icon>
          <span className="text-sm text-gray-200">{item?.location}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <box-icon name="time" color="#E5E7EB"></box-icon>
          <span className="text-sm text-gray-200">
            {moment(item?.createdAt).fromNow()}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" colorScheme={renderTypePost(item?.typePost)}>
            Found item
          </Badge>
          <span className="text-primary text-sm font-bold">
            #{item?.category?.typeName}
          </span>
        </div>
        <div className="mt-2">
          <p className="font-bold">Mô tả: </p>
          <span>{item?.desc}</span>
        </div>
        <p className="mt-2 font-bold">Liên hệ: </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <box-icon name="phone" color="#E5E7EB"></box-icon>
            <span className="text-sm text-gray-200">{item?.author?.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <box-icon name="envelope" color="#E5E7EB"></box-icon>
            <span className="text-sm text-gray-200">{item?.author?.email}</span>
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
