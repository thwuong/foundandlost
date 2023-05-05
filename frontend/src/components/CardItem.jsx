import React, { useState } from "react";
import ExtraImage from "../assets/PlaceholderImage.png";
import { Link } from "react-router-dom";
import { Badge, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { renderTypePost } from "../utils/renderColorStatus";
import InstanceModal from "../components/Modal/InstanceModal";
import VerifyModal from "../components/Modal/VerifyModal";
import { deleteItem } from "../api/postAPI";
function CardItem(props) {
  const user = useSelector((state) => state.auth.user);
  const { item } = props;
  const [option, setOption] = useState(false);
  const dispatch = useDispatch();
  const { isOpen: isOpenVerifyModal, onOpen: onOpenVerifyModal, onClose: onCloseVerifyModal } = useDisclosure();
  const handleRemove = async (status, id) => {
    status && (await deleteItem(dispatch, id));
  };
  return (
    <>
      <div className=" sm:h-[240px] sm:flex-row bg-white rounded-lg shadow flex flex-col h-[400px]">
        <figure className="sm:w-2/5 sm:h-full h-1/2 relative">
          <img
            src={item?.images.length > 0 ? item?.images[0] : ""}
            alt={ExtraImage}
            onError={(e) => {
              e.target.src = ExtraImage;
            }}
            className="sm:object-fill object-cover w-full h-full sm:rounded-tl-lg sm:rounded-bl-lg rounded-lg"
          />
          {item.status === "comfirmed" && (
            <div className="absolute top-0 w-full h-full bg-black/25 rounded-lg flex justify-center items-center">
              <h1 className="text-xl font-bold text-white rotate-45">
                {item?.postType === "Found item" ? "Đã trả cho người mất" : "Đã tìm thấy đồ vật"}
              </h1>
            </div>
          )}
        </figure>
        <div className="sm:w-3/5 h-full p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Badge variant="outline" colorScheme={renderTypePost(item?.postType)}>
              {item?.postType === "Found item" ? "Tìm thấy" : "Bị mất"}
            </Badge>
            <span className="text-sm text-date ">{moment(item?.createdAt).locale("vi").fromNow()}</span>
          </div>

          <h3 className="my-2 font-bold text-2xl truncate">{item?.title}</h3>

          <span className="text-paragarph-black/60 font-medium line-clamp-3">{item?.desc}</span>
          <div className="flex items-center justify-between">
            {user && user.id === item?.ownerId ? (
              <div className="relative">
                <p
                  className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200"
                  onClick={() => {
                    setOption(!option);
                  }}
                >
                  <box-icon name="dots-vertical-rounded"></box-icon>
                </p>
                {option && (
                  <ul className="absolute  top-10 left-0 bg-white p-1 rounded-lg flex gap-2 shadow-xl">
                    <Link to={`/post/${item.id}/edit-post`}>
                      <li className="flex items-center cursor-pointer">
                        <box-icon name="pencil" color="#3364C9"></box-icon>
                      </li>
                    </Link>
                    <li className="flex items-center cursor-pointer" onClick={onOpenVerifyModal}>
                      <box-icon name="trash" color="#3364C9"></box-icon>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <img src={item?.author?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <span>{item?.author?.fullName}</span>
              </div>
            )}

            <Link to={`/post/${item?.id}`}>
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                <span className="text-primary font-bold">Chi tiết</span>
                <box-icon name="right-arrow-alt" color="#2457C5"></box-icon>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVerifyModal}
        content={
          <VerifyModal
            hide={onCloseVerifyModal}
            title={"Chắc chắn xóa bài viết này!"}
            handleVerify={handleRemove}
            selectedId={item.id}
          />
        }
      />
    </>
  );
}

export default CardItem;
