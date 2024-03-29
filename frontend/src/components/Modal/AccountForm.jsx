import React, { useEffect, useState } from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAccount, editAccount } from "../../api/accountAPI";
import { useDispatch } from "react-redux";
import { getUserFullInfo } from "../../api/userAPI";
function AccountForm(props) {
  const { hide, selectedId } = props;
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState(null);
  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      idNumber: "",
      fullName: "",
      password: "",
      phone: "",
      email: "",
    },

    validationSchema: Yup.object().shape({
      phone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
      email: Yup.string().required("Vui lòng nhập email").email("email không hợp lệ"),
      idNumber: Yup.string()
        .required("Vui lòng mã số")
        .matches(/([a-zA-Z])+([0-9]{7})\b/, "Mã số không hợp lệ"),
      password: Yup.string().required("Vui lòng nhập mật khẩu").min(8, "Ít nhất 8 kí tự").trim(),
      fullName: Yup.string().required("Vui lòng nhập tên đầy đủ").trim(),
    }),
    onSubmit: (values) => {
      selectedId ? handleEditAccount(values, selectedId) : handleAddAccount(values);
    },
  });
  const handleAddAccount = async (values) => {
    await createAccount(values, dispatch);
    hide();
  };
  const handleEditAccount = async (values, userId) => {
    await editAccount(values, userId, dispatch);
    hide();
  };

  useEffect(() => {
    // call api edit info
    if (!selectedId) return;
    const fetchUserData = async (userId) => {
      const user = await getUserFullInfo(userId);
      setValues({
        email: user.email,
        fullName: user.fullName,
        idNumber: user.idNumber,
        password: user.password,
        phone: user.phone,
      });
    };
    fetchUserData(selectedId);
  }, [selectedId]);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="mt-4" isInvalid={errors.idNumber && touched.idNumber}>
        <FormLabel htmlFor="idNumber">Mã số:</FormLabel>
        <Input
          isDisabled={selectedId}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.idNumber}
          id="idNumber"
          name="idNumber"
          type="text"
          placeholder="vd: b1293123, b1231234"
        />
        {errors.idNumber && touched.idNumber && <FormErrorMessage>{errors.idNumber}</FormErrorMessage>}
      </FormControl>
      <FormControl className="mt-4" isInvalid={errors.password && touched.password}>
        <FormLabel htmlFor="password">Mẩu khẩu:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          id="password"
          name="password"
          type="text"
          placeholder="Nhập mật khẩu"
        />
        {errors.password && touched.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
      </FormControl>
      <FormControl className="mt-4" isInvalid={errors.fullName && touched.fullName}>
        <FormLabel htmlFor="fullName">Tên đầy đủ:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullName}
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nhập tên đầy đủ"
        />
        {errors.fullName && touched.fullName && <FormErrorMessage>{errors.fullName}</FormErrorMessage>}
      </FormControl>
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
        {errors.phone && touched.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
      </FormControl>
      <FormControl className="mt-4" isInvalid={errors.email && touched.email}>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          id="email"
          name="email"
          type="text"
          placeholder="Nhập Email"
        />
        {errors.email && touched.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
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

export default AccountForm;
