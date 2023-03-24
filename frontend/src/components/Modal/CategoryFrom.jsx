import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCategory,
  editCategory,
  getCategory,
} from "../../api/categoryAPI";
import { useDispatch, useSelector } from "react-redux";
function CategoryFrom(props) {
  const { hide, isEdit, selectedId } = props;
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      typeName: "",
    },
    validationSchema: Yup.object().shape({
      typeName: Yup.string().required("Vui lòng nhập tên danh mục!"),
    }),
    onSubmit: (values) => {
      if (!isEdit) {
        handleAddCategory(values);
      } else {
        handleEditCategory(category.id, values);
      }
    },
  });
  const handleAddCategory = async (values) => {
    const { success } = await createCategory(values, dispatch);
    if (success) {
      hide();
    }
  };
  const handleEditCategory = async (categoryId, values) => {
    const { success } = await editCategory(categoryId, values, dispatch);
    if (success) {
      hide();
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      await getCategory(selectedId, dispatch);
    };
    if (selectedId) {
      fetchCategory();
    }
  }, [selectedId]);
  useEffect(() => {
    if (isEdit) {
      setValues({ typeName: category.typeName });
    }
  }, [category]);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        className="mt-4"
        isInvalid={errors.typeName && touched.typeName}
      >
        <FormLabel htmlFor="typeName">Tên Danh mục:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.typeName || ""}
          id="typeName"
          name="typeName"
          type="text"
          placeholder="Nhập tên danh mục"
        />
        {errors.typeName && touched.typeName && (
          <FormErrorMessage>{errors.typeName}</FormErrorMessage>
        )}
      </FormControl>

      <div className="mt-4">
        <Button type="submit" colorScheme={"messenger"}>
          Lưu
        </Button>
        <Button onClick={hide} ml={4} colorScheme={"pink"} variant="outline">
          Hủy
        </Button>
      </div>
    </form>
  );
}

export default CategoryFrom;
