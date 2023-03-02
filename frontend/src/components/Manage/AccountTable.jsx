import React from "react";
import {
  Tbody,
  Tr,
  Td,
  Table,
  Thead,
  Th,
  TableContainer,
} from "@chakra-ui/react";
function TableContent(props) {
  const { dataList } = props;
  return (
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
                          <p className="text-sm text-gray-500">{data.email}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>{data.phone}</Td>
                    <Td>{data.address}</Td>
                    <Td>{data.createdAt}</Td>

                    <Td>
                      <ul className=" flex items-center gap-2">
                        <li className="cursor-pointer">
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
  );
}

export default TableContent;
