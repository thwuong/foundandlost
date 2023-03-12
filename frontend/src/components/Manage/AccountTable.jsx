import React from "react";
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
import ModalInstance from "../Modal/ModalInstance";
import VerifyModal from "../Modal/VerifyModal";
function TableContent(props) {
  const { dataList } = props;
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
      <TableContainer>
        <Table colorScheme="cyran">
          <Thead>
            <Tr>
              <Th>MSSV</Th>
              <Th>Tên</Th>
              <Th>Số điện thoại</Th>
              <Th>Địa chỉ</Th>
              <Th>Ngày tham gia</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataList && [...dataList].length > 0
              ? [...dataList].map((data) => {
                  return (
                    <Tr key={data.id}>
                      <Td>{data.code}</Td>
                      <Td>
                        <div className="flex gap-1 items-center">
                          <img
                            src={data.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{data.fullName}</p>
                            <p className="text-sm text-gray-500">
                              {data.email}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td>{data.phone}</Td>
                      <Td>{data.address}</Td>
                      <Td>{data.createdAt}</Td>

                      <Td>
                        <ul className=" flex items-center gap-2">
                          <li
                            className="cursor-pointer"
                            onClick={onOpenVerifyModal}
                          >
                            <box-icon name="trash" color="#7286D3"></box-icon>
                          </li>
                          <li className="cursor-pointer">
                            <box-icon name="pencil" color="#7286D3"></box-icon>
                          </li>
                          <li className="cursor-pointer">
                            <box-icon name="show" color="#7286D3"></box-icon>
                          </li>
                        </ul>
                      </Td>
                    </Tr>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalInstance
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
