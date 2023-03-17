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
import { UpdatePassword } from "../../api/userAPI";
function ChangePassword(props) {
  const { hide } = props;
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        comfirmPassword: "",
      },

      validationSchema: Yup.object().shape({
        currentPassword: Yup.string().required(
          "Vui lòng nhập mật khẩu hiện tại"
        ),
        newPassword: Yup.string()
          .required("Vui lòng nhập mật khẩu mới")
          .min(8, "ít nhất 8 kí tự!"),
        comfirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
          .required("Vui lòng nhập lại mật khẩu mới"),
      }),
      onSubmit: (values) => {
        console.log(values);
        handleChangePassword(values);
      },
    });
  const handleChangePassword = async (values) => {
    const { success } = await UpdatePassword(values);
    if (success) {
      hide();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        className="mt-4"
        isInvalid={errors.currentPassword && touched.currentPassword}
      >
        <FormLabel htmlFor="currentPassword">Mật khẩu hiện tại:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.currentPassword}
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="Nhập Mật khẩu hiện tại"
        />
        {errors.currentPassword && touched.currentPassword && (
          <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        className="mt-4"
        isInvalid={errors.newPassword && touched.newPassword}
      >
        <FormLabel htmlFor="newPassword">Mật khẩu mới:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Nhập Mật khẩu mới"
        />
        {errors.newPassword && touched.newPassword && (
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        className="mt-4"
        isInvalid={errors.comfirmPassword && touched.comfirmPassword}
      >
        <FormLabel htmlFor="comfirmPassword">Xác nhận mật khẩu:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.comfirmPassword}
          id="comfirmPassword"
          name="comfirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
        />
        {errors.comfirmPassword && touched.comfirmPassword && (
          <FormErrorMessage>{errors.comfirmPassword}</FormErrorMessage>
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

export default ChangePassword;
