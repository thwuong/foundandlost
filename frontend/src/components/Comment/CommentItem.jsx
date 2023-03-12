import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import CommentInput from "./CommentInput";
import ModalInstance from "../../components/Modal/ModalInstance";
import VerifyModal from "../../components/Modal/VerifyModal";
function CommentItem(props) {
  const { children, me } = props;
  const [showInput, setShowInput] = useState(false);
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
      <li className="flex gap-2 mt-4">
        <figure>
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/288626878_607825927378039_7742026331312148591_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=56cHRg2aK0cAX_U7Ydz&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBXErQLaP06PRD3bja8rTwV7BIJIApw6gkaoWXQZnsiYg&oe=64059601"
            alt=""
          />
        </figure>
        <div className="">
          <div className="p-2 rounded-2xl bg-white">
            <div className="flex justify-between">
              <p className="font-medium">Phúc bùi</p>
              {me && (
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
                    <ul className="absolute top-full right-0 bg-white p-1 rounded-lg flex gap-2 z-10">
                      <li
                        className="flex items-center cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <box-icon name="pencil" color="#3364C9"></box-icon>
                      </li>
                      <li
                        className="flex items-center cursor-pointer"
                        title="Xóa"
                        onClick={onOpenVerifyModal}
                      >
                        <box-icon name="trash" color="#3364C9"></box-icon>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            <span>
              Một bộ phim nhẹ nhàng nhưng vô cùng xúc động giá cái kết khác
            </span>
          </div>
          <div className="">
            <label
              onClick={() => {
                setShowInput(true);
              }}
              htmlFor="idInput"
              className="text-sm text-white cursor-pointer font-bold hover:underline"
            >
              Phản hồi
            </label>
            <span className="text-sm text-white ml-2">2 giờ</span>
          </div>
          {children}
          {showInput && <CommentInput idInput={"idInput"} />}
        </div>
      </li>
      <ModalInstance
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa yêu cầu này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default CommentItem;
