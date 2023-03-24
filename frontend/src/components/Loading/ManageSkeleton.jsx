import React from "react";
import { Skeleton, Tbody, Tr, Td, Table, Thead, Th } from "@chakra-ui/react";
function ManageSkeleton() {
  return (
    <Table>
      <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
        <Tr>
          <Th>
            <Skeleton height={"20px"} />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <Skeleton height={"20px"} />
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Skeleton height={"20px"} />
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Skeleton height={"20px"} />
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Skeleton height={"20px"} />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default ManageSkeleton;
