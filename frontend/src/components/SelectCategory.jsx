import React, { useRef } from "react";
import { Select } from "@chakra-ui/react";
function SelectCategory(props) {
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
  return (
    <Select placeholder="Chọn Danh mục" onChange={handleSelecting}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
}

export default SelectCategory;
