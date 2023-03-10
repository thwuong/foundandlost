import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Badge, useDisclosure } from "@chakra-ui/react";
import { renderStatusRequest } from "../../utils/renderColorStatus";
import ModalInstance from "../../components/Modal/ModalInstance";
import VerifyModal from "../../components/Modal/VerifyModal";
function Request(props) {
  const { me } = props;
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
                    title="Ch???nh s???a"
                  >
                    <box-icon name="pencil" color="#3364C9"></box-icon>
                  </li>
                  <li
                    className="flex items-center cursor-pointer"
                    title="X??a"
                    onClick={onOpenVerifyModal}
                  >
                    <box-icon name="trash" color="#3364C9"></box-icon>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        {me && (
          <h5 className="mt-2 font-semibold">
            Y??u c???u cho b??i vi???t : 111111111111111
          </h5>
        )}
        <p className="mt-2">t??i mu???n nh???n l???i c??i n??y</p>
        {!me && (
          <div className="mt-2 flex gap-2">
            <Button
              size="sm"
              leftIcon={<box-icon name="check" color="white"></box-icon>}
              colorScheme="whatsapp"
            >
              ?????ng ??
            </Button>
            <Button
              size="sm"
              leftIcon={<box-icon name="x" color="#D53F8C"></box-icon>}
              colorScheme="pink"
              variant="outline"
            >
              T??? ch???i
            </Button>
          </div>
        )}
      </div>
      <ModalInstance
        show={isOpenVerifyModal}
        modalName={"X??c nh???n"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Ch???c ch???n x??a y??u c???u n??y!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default Request;
