import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, useDisclosure } from "@chakra-ui/react";
import { renderTypePost } from "../utils/renderColorStatus";
import moment from "moment";
import ExtraImage from "../assets/PlaceholderImage.png";
import InstanceModal from "./Modal/InstanceModal";
import RequestForm from "./Modal/RequestForm";
import { useSelector } from "react-redux";
function PostItem(props) {
  const { item, handleSelectedChat } = props;
  const user = useSelector((state) => state.auth.user);
  const [imageActive, setImageActive] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setImageActive(() => {
      if (item?.images && item?.images.length > 0) {
        return item?.images[0];
      }
      return " ";
    });
  }, [item]);
  return (
    <>
      <div className="lg:flex-row flex-col-reverse flex gap-5 p-4 bg-gray-200 shadow rounded-lg">
        <div className="lg:w-1/2">
          <figure>
            <img
              className="w-full h-[380px] object-center"
              src={imageActive}
              alt=""
              onError={(e) => {
                e.target.src = ExtraImage;
              }}
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
                      className={`${imageActive === image ? "border-2 border-black/20" : ""}`}
                    >
                      <img
                        className="w-16 h-16 object-cover cursor-pointer"
                        src={image}
                        alt=""
                        onError={(e) => {
                          e.target.src = ExtraImage;
                        }}
                      />
                    </figure>
                  );
                })
              : null}
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <figure>
                <img className="lg:w-8 lg:h-8 w-7 h-7 rounded-full" src={item?.author?.avatar} alt="" />
              </figure>
              <Link to={`/profile/${item?.ownerId}`}>
                <p className="font-bold">{item?.author?.fullName + " " + item?.author?.idNumber}</p>
              </Link>
            </div>
            {user && user.id !== item?.ownerId ? (
              <p
                onClick={() => {
                  handleSelectedChat(item?.ownerId);
                }}
                className="lg:w-10 lg:h-10 w-8 h-8 rounded-full p-1 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
              >
                <box-icon type="logo" name="messenger"></box-icon>
              </p>
            ) : null}
          </div>
          <h2 className="mt-2 text-2xl font-bold">{item?.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <box-icon name="map" color="#6E798C"></box-icon>
            <span className="text-sm text-date">{item?.location}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <box-icon name="time" color="#6E798C"></box-icon>
            <span className="text-sm text-date">{moment(item?.createdAt).fromNow()}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="outline" colorScheme={renderTypePost(item?.typePost)}>
              {item?.postType === "Found Item" ? "Tìm thấy" : "Bị mất"}
            </Badge>
            <span className="text-primary text-sm font-bold">#{item?.category?.typeName}</span>
          </div>
          <div className="mt-2">
            <p className="font-bold">Mô tả: </p>
            <span>{item?.desc}</span>
          </div>
          <p className="mt-2 font-bold">Liên hệ: </p>
          <div className="flex justify-between flex-wrap">
            <div className="flex items-center gap-2">
              <box-icon name="phone" color="#6E798C"></box-icon>
              <span className="text-sm text-date">{item?.author?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <box-icon name="envelope" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">{item?.author?.email}</span>
            </div>
          </div>
          {user && user.id !== item?.ownerId ? (
            <button
              disabled={item?.status === "comfirmed"}
              onClick={onOpen}
              className="disabled:bg-primary/60 mt-2 px-2 ml-auto text-center cursor-pointer py-1 lg:w-[30%] text-white bg-primary rounded hover:bg-primary/90"
            >
              {item?.status === "comfirmed" ? "Đã xác nhận" : "Gửi yêu cầu"}
            </button>
          ) : null}
        </div>
      </div>
      <InstanceModal
        modalName={"Gửi yêu cầu"}
        show={isOpen}
        hide={onClose}
        content={<RequestForm hide={onClose} postId={item?.id} />}
      />
    </>
  );
}

export default PostItem;
