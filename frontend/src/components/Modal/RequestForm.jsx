import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../api/requetsAPI";
import { useDispatch } from "react-redux";
function RequestForm(props) {
  const { hide, postId } = props;
  const dispatch = useDispatch();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        desc: "",
      },

      validationSchema: Yup.object().shape({
        desc: Yup.string()
          .required("Vui lòng nhập mô tả yêu cầu!")
          .max(255, "Không được quá 255 kí tự"),
      }),
      onSubmit: (values) => {
        values.postId = postId;
        handleAddAccount(values);
      },
    });
  const handleAddAccount = async (values) => {
    const { success } = await postRequest(dispatch, values);
    if (success) {
      hide();
    }
  };
  useEffect(() => {
    // call api edit info
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="mt-4" isInvalid={errors.desc && touched.desc}>
        <FormLabel htmlFor="desc">Mô tả yêu cầu:</FormLabel>
        <Textarea
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.desc}
          size={"md"}
          as="textarea"
          id="desc"
          name="desc"
          placeholder="Nhập mô tả yêu cầu"
          resize="none"
        />
        {errors.desc && touched.desc && (
          <FormErrorMessage>{errors.desc}</FormErrorMessage>
        )}
      </FormControl>
      <div className="mt-4">
        <Button type="submit" colorScheme={"messenger"}>
          Gửi
        </Button>
        <Button onClick={hide} ml={4} colorScheme={"pink"} variant="outline">
          Hủy
        </Button>
      </div>
    </form>
  );
}

export default RequestForm;
