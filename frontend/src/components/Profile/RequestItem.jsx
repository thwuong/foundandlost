import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Badge, useDisclosure } from "@chakra-ui/react";
import { renderStatusRequest } from "../../utils/renderColorStatus";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "../../api/requetsAPI";

function RequestItem(props) {
  const { request, handleRespone } = props;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const { isOpen: isOpenVerifyModal, onOpen: onOpenVerifyModal, onClose: onCloseVefiryModal } = useDisclosure();
  const handleRemove = async (status, id) => {
    if (status) {
      await deleteRequest(dispatch, id);
    }
  };

  return (
    <>
      <div className="bg-white px-6 py-4 rounded-lg mb-4">
        <div className="flex justify-between">
          <div className="flex gap-2 items-start">
            <figure>
              <img className="w-10 h-10 rounded-full object-cover" src={request?.author?.avatar} alt="" />
            </figure>
            <div>
              <Link to={`/profile/${request?.userId}`}>
                <p className="font-bold leading-4 cursor-pointer hover:text-gray-600">{request?.author?.fullName}</p>
              </Link>
              <span className="text-sm text-gray-400 leading-4">{request?.author?.email}</span>
            </div>

            <Badge variant="solid" colorScheme={renderStatusRequest(request?.status)}>
              {request?.status === "pending"
                ? "Đang chờ duyệt"
                : request?.status === "accepted"
                ? "Đã xác minh"
                : "Đã từ chối"}
            </Badge>
          </div>
          {user?.id === request?.userId && (
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
                  {/* <li className="flex items-center cursor-pointer" title="Chỉnh sửa">
                    <box-icon name="pencil" color="#3364C9"></box-icon>
                  </li> */}
                  <li className="flex items-center cursor-pointer" title="Xóa" onClick={onOpenVerifyModal}>
                    <box-icon name="trash" color="#3364C9"></box-icon>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        {user.id === request?.userId && (
          <Link to={`/post/${request?.postId}`}>
            <h5 className="mt-2 font-semibold hover:text-black/70">Yêu cầu cho bài viết : {request?.post?.title}</h5>
          </Link>
        )}
        <p className="mt-2">{request.desc}</p>
        {user.id !== request?.userId && request.status === "pending" && (
          <div className="mt-2 flex gap-2">
            <Button
              className="flex items-center"
              onClick={() => {
                handleRespone("accepted", request?.postId, request?.id);
              }}
              size="sm"
              colorScheme="teal"
            >
              Đồng ý
            </Button>
            <Button
              className="flex items-center"
              onClick={() => {
                handleRespone("refused", request?.postId, request?.id);
              }}
              size="sm"
              colorScheme="pink"
              variant="outline"
            >
              Từ chối
            </Button>
          </div>
        )}
      </div>
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa yêu cầu này!"}
            handleVerify={handleRemove}
            selectedId={request?.id}
          />
        }
      />
    </>
  );
}

export default RequestItem;
