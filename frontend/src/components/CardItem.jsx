import React, { useState } from "react";
import ExtraImage from "../assets/PlaceholderImage.png";
import { Link } from "react-router-dom";
import { Badge, useDisclosure } from "@chakra-ui/react";
import { renderTypePost } from "../utils/renderColorStatus";
import InstanceModal from "../components/Modal/InstanceModal";
import VerifyModal from "../components/Modal/VerifyModal";
import { useSelector } from "react-redux";
function CardItem(props) {
  const user = useSelector((state) => state.auth.user);
  const { item } = props;
  const [option, setOption] = useState(false);
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVefiryModal,
  } = useDisclosure();
  const handleRemove = (status) => {
    console.log(status);
  };
  return (
    <>
      <div className="p-4 bg-white/40 rounded-lg h-full flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-start gap-2">
            <figure>
              <img
                src={item?.images.length > 0 ? item?.images[0] : ""}
                alt={ExtraImage}
                onError={(e) => {
                  e.target.src = ExtraImage;
                }}
                className="w-28 h-28 rounded"
              />
            </figure>
            <Badge
              variant="outline"
              colorScheme={renderTypePost(item?.postType)}
            >
              {item?.postType}
            </Badge>
          </div>
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
                <ul className="absolute top-full left-0 bg-white p-1 rounded-lg flex gap-2">
                  <li className="flex items-center cursor-pointer">
                    <box-icon name="pencil" color="#3364C9"></box-icon>
                  </li>
                  <li
                    className="flex items-center cursor-pointer"
                    onClick={onOpenVerifyModal}
                  >
                    <box-icon name="trash" color="#3364C9"></box-icon>
                  </li>
                </ul>
              )}
            </div>
          ) : null}
        </div>

        <h3 className="my-2 font-bold text-xl text-primary/80 line-clamp-2">
          {item?.title}
        </h3>
        <div className="my-2 flex items-center gap-1">
          <box-icon type="solid" name="map" size="sm" color="gray"></box-icon>
          <span className="text-paragarph-black/60 font-medium">
            {item?.location}
          </span>
        </div>
        <Link to={`/post/${item?.id}`}>
          <div className="w-full py-2 bg-primary/90 hover:bg-primary rounded flex items-center justify-center gap-2 cursor-pointer">
            <span className="text-paragarph-white font-bold">Chi tiết</span>
            <box-icon name="expand-alt" color="white"></box-icon>
          </div>
        </Link>
      </div>
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa bài viết này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default CardItem;
