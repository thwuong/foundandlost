import React from "react";
import { Link } from "react-router-dom";
import { Tr, Td, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
function AccountRow(props) {
  const { account, handleRemove } = props;
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVerifyModal,
  } = useDisclosure();
  return (
    <Tr>
      <Td>{account.idNumber}</Td>
      <Td>
        <div className="flex gap-1 items-center">
          <img
            src={account.avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{account.fullName}</p>
            <p className="text-sm text-gray-500">{account.email}</p>
          </div>
        </div>
      </Td>
      <Td>{account.phone}</Td>
      <Td>{moment(account.createdAt).format("LL")}</Td>

      <Td>
        <ul className=" flex items-center gap-2">
          <li className="cursor-pointer" onClick={onOpenVerifyModal}>
            <box-icon name="trash" color="#7286D3"></box-icon>
          </li>
          <li className="cursor-pointer">
            <box-icon name="pencil" color="#7286D3"></box-icon>
          </li>
          <Link to={`/profile/${account.id}`}>
            <li className="cursor-pointer">
              <box-icon name="show" color="#7286D3"></box-icon>
            </li>
          </Link>
        </ul>
        <InstanceModal
          show={isOpenVerifyModal}
          modalName={"Xác nhận"}
          hide={onCloseVerifyModal}
          content={
            <VerifyModal
              hide={onCloseVerifyModal}
              title={"Chắc chắn xóa sinh viên này!"}
              handleVerify={handleRemove}
              selectedId={account.id}
            />
          }
        />
      </Td>
    </Tr>
  );
}

export default AccountRow;
