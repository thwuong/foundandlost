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
function CategogyTable(props) {
  const { dataList } = props;
  return (
    <TableContainer>
      <Table colorScheme="cyran">
        <Thead>
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

export default CategogyTable;
