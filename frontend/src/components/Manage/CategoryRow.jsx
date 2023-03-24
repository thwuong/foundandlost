import React from "react";
import { Tr, Td, useDisclosure } from "@chakra-ui/react";
import InstanceModal from "../Modal/InstanceModal";
import VerifyModal from "../Modal/VerifyModal";
import CategoryFrom from "../Modal/CategoryFrom";
function CategoryRow(props) {
  const { category, handleRemove, stt } = props;
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
  return (
    <Tr>
      <Td>{stt + 1}</Td>
      <Td>{category.typeName}</Td>
      <Td>
        <ul className=" flex items-center gap-2">
          <li className="cursor-pointer" onClick={onOpenVerifyModal}>
            <box-icon name="trash" color="#7286D3"></box-icon>
          </li>
          <li className="cursor-pointer" onClick={onOpenEditCategory}>
            <box-icon name="pencil" color="#7286D3"></box-icon>
          </li>
        </ul>
        <InstanceModal
          show={isOpenVerifyModal}
          modalName={"Xác nhận"}
          hide={onCloseVerifyModal}
          content={
            <VerifyModal
              hide={onCloseVerifyModal}
              title={"Chắc chắn xóa danh mục này!"}
              handleVerify={handleRemove}
              selectedId={category.id}
            />
          }
        />
        <InstanceModal
          show={isOpenEditCategory}
          modalName={"Chỉnh sửa danh mục"}
          hide={onCloseEditCategory}
          content={
            <CategoryFrom
              hide={onCloseEditCategory}
              isEdit={true}
              selectedId={category.id}
            />
          }
        />
      </Td>
    </Tr>
  );
}

export default CategoryRow;
