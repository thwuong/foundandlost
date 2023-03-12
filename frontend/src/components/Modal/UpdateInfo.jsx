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
function UpdateInfo(props) {
  const { hide } = props;
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
      phone: "",
      address: "",
    },

    validationSchema: Yup.object().shape({
      phone: Yup.string().matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không đúng!"
      ),
      address: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleUpdate(values);
    },
  });
  const handleUpdate = (values) => {
    // call api update info
  };
  useEffect(() => {
    // call api edit info
    setValues({
      phone: "0794290085",
      address: "rỗng",
    });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="mt-4" isInvalid={errors.phone && touched.phone}>
        <FormLabel htmlFor="phone">Số điện thoại:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          id="phone"
          name="phone"
          type="text"
          placeholder="Nhập số điện thoại"
        />
        {errors.phone && touched.phone && (
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        className="mt-4"
        isInvalid={errors.address && touched.address}
      >
        <FormLabel htmlFor="address">Địa chỉ:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.address}
          id="address"
          name="address"
          type="text"
          placeholder="Nhập địa chỉ"
        />
        {errors.address && touched.address && (
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        )}
      </FormControl>

      <div className="mt-4">
        <Button type="submit" colorScheme={"messenger"}>
          Cập nhật
        </Button>
        <Button onClick={hide} ml={4} colorScheme={"pink"} variant="outline">
          Hủy
        </Button>
      </div>
    </form>
  );
}

export default UpdateInfo;
