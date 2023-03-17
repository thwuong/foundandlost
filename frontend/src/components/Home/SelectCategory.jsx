import React, { useRef, useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { getAllCategory } from "../../api/categoryAPI";
import { useDispatch, useSelector } from "react-redux";
function SelectCategory(props) {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const typingTimeoutRef = useRef(null);
  const { onSelect } = props;

  const handleSelecting = (e) => {
    const value = e.target.value;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSelect(value);
    }, 500);
  };
  useEffect(() => {
    const fetchAllCategory = async () => {
      await getAllCategory(dispatch);
    };
    fetchAllCategory();
  }, []);
  return (
    <Select placeholder="Chọn Danh mục" onChange={handleSelecting}>
      {categories && categories.length > 0
        ? categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.typeName}
              </option>
            );
          })
        : null}
    </Select>
  );
}

export default SelectCategory;
