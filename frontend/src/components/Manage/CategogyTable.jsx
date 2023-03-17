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
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
function CategogyTable(props) {
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
      <TableContainer overflowX="unset" overflowY="unset">
        <Table>
          <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
            <Tr>
              <Th>Id</Th>
              <Th>Tên Danh mục</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataList && [...dataList].length > 0
              ? [...dataList].map((data) => {
                  return (
                    <Tr key={data.id}>
                      <Td>{data.id}</Td>
                      <Td>{data.typeName}</Td>

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
      <InstanceModal
        show={isOpenVerifyModal}
        modalName={"Xác nhận"}
        hide={onCloseVefiryModal}
        content={
          <VerifyModal
            hide={onCloseVefiryModal}
            title={"Chắc chắn xóa danh mục này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default CategogyTable;
