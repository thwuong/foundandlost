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
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import CategoryFrom from "../Modal/CategoryFrom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  deleteCategory,
  getCategory,
} from "../../api/categoryAPI";
function CategogyTable() {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    isOpen: isOpenVerifyModal,
    onOpen: onOpenVerifyModal,
    onClose: onCloseVerifyModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditCategory,
    onOpen: onOpenEditCategory,
    onClose: onCloseEditCategory,
  } = useDisclosure();
  const handleRemove = async (status) => {
    if (status) {
      await deleteCategory(selectedCategory, dispatch);
    }
  };
  const handleSelected = async (categoryId) => {
    await getCategory(categoryId, dispatch);
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
                    <Tr key={category.id}>
                      <Td>{index + 1}</Td>
                      <Td>{category.typeName}</Td>

                      <Td>
                        <ul className=" flex items-center gap-2">
                          <li
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedCategory(category.id);
                              onOpenVerifyModal();
                            }}
                          >
                            <box-icon name="trash" color="#7286D3"></box-icon>
                          </li>
                          <li
                            className="cursor-pointer"
                            onClick={() => {
                              handleSelected(category.id);
                              onOpenEditCategory();
                            }}
                          >
                            <box-icon name="pencil" color="#7286D3"></box-icon>
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
        hide={onCloseVerifyModal}
        content={
          <VerifyModal
            hide={onCloseVerifyModal}
            title={"Chắc chắn xóa danh mục này!"}
            handleVerify={handleRemove}
          />
        }
      />
      <InstanceModal
        show={isOpenEditCategory}
        modalName={"Chỉnh sửa danh mục"}
        hide={onCloseEditCategory}
        content={<CategoryFrom hide={onCloseEditCategory} isEdit={true} />}
      />
    </>
  );
}

export default CategogyTable;
