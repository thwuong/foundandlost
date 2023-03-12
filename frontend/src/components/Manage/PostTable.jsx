import React from "react";
import {
  Badge,
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
import {
  renderTypePost,
  renderStatusPost,
} from "../../utils/renderColorStatus";
function PostTable(props) {
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
              <Th>Loại đồ vật</Th>
              <Th>Người đăng</Th>
              <Th>Trạng thái</Th>
              <Th>
                <span>Ngày đăng</span>
              </Th>
              <Th>Địa điểm</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataList && [...dataList].length > 0
              ? [...dataList].map((data) => {
                  return (
                    <Tr key={data.id}>
                      <Td>
                        <Badge
                          variant="outline"
                          colorScheme={renderTypePost(data.postType)}
                        >
                          {data.postType}
                        </Badge>
                      </Td>
                      <Td>
                        <div className="flex gap-1 items-center">
                          <img
                            src={data.author.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">
                              {data.author.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {data.author.email}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <Badge
                          variant="solid"
                          colorScheme={renderStatusPost(data.status)}
                        >
                          {data.status}
                        </Badge>
                      </Td>
                      <Td>
                        {new Date(data.createdAt).toLocaleDateString("en-US")}
                      </Td>
                      <Td>{data.location}</Td>

                      <Td>
                        <ul className=" flex items-center gap-2">
                          <li className="cursor-pointer">
                            <box-icon name="show" color="#7286D3"></box-icon>
                          </li>
                          {data.status === "expired" ? (
                            <li
                              className="cursor-pointer"
                              onClick={onOpenVerifyModal}
                            >
                              <box-icon name="trash" color="#7286D3"></box-icon>
                            </li>
                          ) : null}
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
            title={"Chắc chắn xóa đồ vật này!"}
            handleVerify={handleRemove}
          />
        }
      />
    </>
  );
}

export default PostTable;
