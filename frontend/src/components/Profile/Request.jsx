import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Badge, useDisclosure } from "@chakra-ui/react";
import { renderStatusRequest } from "../../utils/renderColorStatus";
import InstanceModal from "../../components/Modal/InstanceModal";
import VerifyModal from "../../components/Modal/VerifyModal";
import { useDispatch, useSelector } from "react-redux";
import { getMyRequests, getRequestList } from "../../api/requetsAPI";
function Request(props) {
  const { post } = props;
  const { profile, requets } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVefiryModal,
  } = useDisclosure();
  const handleRemove = (status) => {
    console.log(status);
  };
  useEffect(() => {
    const fetchMyRequets = async () => {
      await getMyRequests(dispatch);
    };
    const fetchListRequets = async () => {
      await getRequestList(dispatch, post.id);
    };
    if (post) {
      fetchListRequets();
    } else {
      fetchMyRequets();
    }
  }, []);
  return (
    <>
      <div className="bg-white px-6 py-4 rounded-lg mb-4">
        <div className="flex justify-between">
          <div className="flex gap-2 items-start">
            <figure>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/328130832_1855564528161017_6159523852991919296_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3fW4Xt-sZP4AX-e5ja-&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBGLZ6DHKqRho2yN61BihgCUp11gpHMiAVHi12RJfWUqw&oe=640755EC"
                alt=""
              />
            </figure>
            <div>
              <Link>
                <p className="font-bold leading-4 cursor-pointer hover:text-gray-600">
                  Duong Anh Thuong
                </p>
              </Link>
              <span className="text-sm text-gray-400 leading-4">
                email@gmail.com
              </span>
            </div>

            <Badge variant="solid" colorScheme={renderStatusRequest("pending")}>
              {"pending"}
            </Badge>
          </div>
          {user?.id !== profile?.id && (
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
        {user.id !== profile.id && (
          <h5 className="mt-2 font-semibold">
            Yêu cầu cho bài viết : 111111111111111
          </h5>
        )}
        <p className="mt-2">tôi muốn nhận lại cái này</p>
        {user.id === profile.id && (
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              leftIcon={<box-icon name="check" color="white"></box-icon>}
              colorScheme="whatsapp"
            >
              Đồng ý
            </Button>
            <Button
              size="sm"
              leftIcon={<box-icon name="x" color="#D53F8C"></box-icon>}
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
          />
        }
      />
    </>
  );
}

export default Request;
