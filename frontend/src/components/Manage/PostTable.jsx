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
} from "@chakra-ui/react";

function PostTable(props) {
  const { dataList } = props;
  const renderColorStatus = (status) => {
    return status === "pending"
      ? "yellow"
      : status === "confirmed"
      ? "green"
      : "red";
  };
  const renderColorType = (type) => {
    return type === "Found item" ? "blue" : "purple";
  };
  return (
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
                        colorScheme={renderColorType(data.postType)}
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
                        colorScheme={renderColorStatus(data.status)}
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
                          <li className="cursor-pointer">
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
  );
}

export default PostTable;
