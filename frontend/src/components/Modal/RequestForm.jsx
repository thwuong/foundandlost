import React, { useEffect } from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, FormHelperText, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../api/requetsAPI";
import { useDispatch } from "react-redux";
function RequestForm(props) {
  const { hide, postId } = props;
  const dispatch = useDispatch();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      desc: "",
    },

    validationSchema: Yup.object().shape({
      desc: Yup.string().required("Vui lòng nhập mô tả yêu cầu!").max(255, "Không được quá 255 kí tự"),
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
  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="mt-4" isInvalid={errors.desc && touched.desc}>
        <FormLabel htmlFor="desc">Tôi muốn nhận đồ vật này</FormLabel>
        <FormHelperText className="my-4">
          Vui lòng cho biết tại sao mặt hàng này là của bạn Vui lòng mô tả càng nhiều chi tiết về mặt hàng không hiển
          thị hoặc không được mô tả để công cụ tìm có thể nhận ra bạn là chủ sở hữu. Và nếu có thể, hãy cung cấp càng
          nhiều thông tin càng tốt về nơi bạn làm mất đồ (ví dụ: thời gian và địa điểm). Hãy cẩn thận khi chia sẻ thông
          tin cá nhân.
        </FormHelperText>
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

        {errors.desc && touched.desc && <FormErrorMessage>{errors.desc}</FormErrorMessage>}
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
