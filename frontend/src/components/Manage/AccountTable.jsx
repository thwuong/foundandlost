import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Tbody,
  Tr,
  Td,
  Table,
  Thead,
  Th,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteAccount, getAllAccount } from "../../api/accountAPI";
import { useSelector, useDispatch } from "react-redux";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
function TableContent() {
  const [selectedAcc, setSelectedAcc] = useState(null);
  const { accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVefiryModal,
  } = useDisclosure();
  const handleRemove = async (status) => {
    if (status) {
      await deleteAccount(selectedAcc, dispatch);
    }
  };
  useEffect(() => {
    const fetchAllAccount = async () => {
      await getAllAccount(dispatch);
    };
    fetchAllAccount();
    console.log(accounts);
  }, []);
  return (
    <>
      <TableContainer>
        <Table colorScheme="cyran">
          <Thead>
            <Tr>
              <Th>MSSV</Th>
              <Th>Tên</Th>
              <Th>Số điện thoại</Th>
              <Th>Ngày tham gia</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts
              ? accounts.map((account) => {
                  return (
                    <Tr key={account.id}>
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
                            <p className="text-sm text-gray-500">
                              {account.email}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td>{account.phone}</Td>
                      <Td>{account.createdAt}</Td>

                      <Td>
                        <ul className=" flex items-center gap-2">
                          <li
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedAcc(account.id);
                              onOpenVerifyModal();
                            }}
                          >
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
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa sinh viên này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default TableContent;
