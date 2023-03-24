import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../customHooks/useLoading";
import { getAllCategory, deleteCategory } from "../../api/categoryAPI";
import ManageSkeleton from "../Loading/ManageSkeleton";
import CategoryRow from "./CategoryRow";
function CategogyTable() {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const loading = useLoading();
  const handleRemove = async (status, categoryId) => {
    if (status) {
      await deleteCategory(categoryId, dispatch);
    }
  };
  useEffect(() => {
    const fetchAllCategory = async () => {
      await getAllCategory(dispatch);
    };
    fetchAllCategory();
  }, []);
  return (
    <>
      <TableContainer overflowX="unset" overflowY="unset">
        {loading ? (
          <ManageSkeleton />
        ) : (
          <Table>
            <Thead position={"sticky"} top={0} zIndex="docked" bg={"white"}>
              <Tr>
                <Th>Id</Th>
                <Th>Tên Danh mục</Th>
                <Th>Tùy chọn</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories
                ? categories.map((category, index) => {
                    return (
                      <CategoryRow
                        key={category.id}
                        category={category}
                        stt={index}
                        handleRemove={handleRemove}
                      />
                    );
                  })
                : null}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

export default CategogyTable;
