import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import imageUpload from "../../assets/image-upload.jpg";
import PreviewImage from "../PreviewImage";
import { validationMultipleImage } from "../../utils/validationImage";
function PostForm(props) {
  const { isEdit } = props;
  const [errUpload, setErrUpload] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      location: "",
      postType: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Vui lòng nhập tiêu đề bài viết!")
        .min(15, "Đồ dài nhỏ nhất nhất 15 kí tự")
        .max(150, "Đồ dài tối đa 150 kí tự!"),
      desc: Yup.string().max(255, "Đồ dài tối đa 255 kí tự!"),
      location: Yup.string().required("Vui lòng nhập địa điểm!"),
      postType: Yup.string().required("Vui lòng chọn loại bài viết!"),
      categoryId: Yup.string().required("Vui lòng chọn danh mục đồ vật!"),
    }),
    onSubmit: (values) => {
      if (!errUpload) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          if (isEdit) {
            handleEditPost(values);
          } else {
            handleCreatePost(values);
          }
        }, 2000);
      }
    },
  });
  const handleCreatePost = (values) => {
    console.log(values);
    // CallAPi
  };
  const handleEditPost = (values) => {
    console.log(values);
    // CallAPi
  };
  const handlePhotoChange = (e) => {
    const error = validationMultipleImage(e.target.files);
    if (error) {
      setErrUpload(error);
    } else {
      setFiles(e.target.files);
      values.images = e.target.files;
    }
  };

  useEffect(() => {
    if (isEdit) {
      // setValues()
    }
  }, []);
  return (
    <>
      <h1 className="text-3xl text-primary text-center font-bold">
        {isEdit ? "ĐĂNG ĐỒ VẬT" : "Chỉnh sửa thông tin đồ vật"}
      </h1>
      <form onSubmit={handleSubmit} className="py-8">
        <div className="flex gap-10">
          <div className="w-[55%]">
            <FormControl
              className="mt-4"
              isInvalid={errors.title && touched.title}
            >
              <FormLabel htmlFor="title">Tiêu đề</FormLabel>
              <Input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                id="title"
                name="title"
                type="text"
                placeholder="Nhập tiêu đề"
              />
              {errors.title && touched.title && (
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              className="mt-4"
              isInvalid={errors.desc && touched.desc}
            >
              <FormLabel htmlFor="desc">Mô tả</FormLabel>

              <Textarea
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                className="h-[130px]"
                as="textarea"
                id="desc"
                name="desc"
                placeholder="Nhập mô tả"
                resize="none"
              />
              {errors.desc && touched.desc && (
                <FormErrorMessage>{errors.desc}</FormErrorMessage>
              )}
            </FormControl>
          </div>
          <div className="w-[45%]">
            <div className="flex gap-5">
              <FormControl
                className="mt-4"
                isInvalid={errors.postType && touched.postType}
              >
                <FormLabel htmlFor="postType">Loại bài viết</FormLabel>
                <Select
                  placeholder="Chọn Loại bài viết"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.postType}
                  name="postType"
                >
                  <option>United Arab Emirates</option>
                  <option>Nigeria</option>
                </Select>
                {errors.postType && touched.postType && (
                  <FormErrorMessage>{errors.postType}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                className="mt-4"
                isInvalid={errors.categoryId && touched.categoryId}
              >
                <FormLabel htmlFor="categoryId">Danh mục đồ vật</FormLabel>
                <Select
                  placeholder="Chọn danh mục"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.categoryId}
                  name="categoryId"
                >
                  <option>United Arab Emirates</option>
                  <option>Nigeria</option>
                </Select>
                {errors.categoryId && touched.categoryId && (
                  <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                )}
              </FormControl>
            </div>
            <FormControl
              className="mt-4"
              isInvalid={errors.location && touched.location}
            >
              <FormLabel htmlFor="location">Địa điểm</FormLabel>

              <Input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                id="location"
                name="location"
                type="text"
                placeholder="Địa điểm đồ vật được tìm thấy hoặc thất lạc"
              />
              {errors.location && touched.location && (
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              )}
            </FormControl>
          </div>
        </div>
        <div className="flex gap-10 mt-4 items-start">
          <div className="w-[30%]">
            <FormControl isInvalid={errUpload}>
              <FormLabel>Hình Ảnh</FormLabel>
              <FormLabel
                htmlFor="images"
                className="block border-dashed border-4 cursor-pointer"
              >
                <img src={imageUpload} alt="" />
                <p className="text-gray-500 w-[60%] mx-auto text-center my-1">
                  Chọn nhiều tệp từ máy tính của bạn
                </p>
              </FormLabel>

              <Input
                hidden
                onChange={handlePhotoChange}
                id="images"
                name="images"
                type="file"
                multiple
              ></Input>
              <span className="text-gray-400">File type: jpg, jpeg, png</span>
              {errUpload && <FormErrorMessage>{errUpload}</FormErrorMessage>}
            </FormControl>
          </div>
          <div className="w-[70%] mt-8">
            <PreviewImage files={files} />
          </div>
        </div>
        <Button
          className="mt-4"
          type="sumbit"
          colorScheme="facebook"
          isLoading={isLoading}
        >
          {isEdit ? "Đăng bài" : "Lưu"}
        </Button>
        <Link to={"/"}>
          <Button colorScheme="pink" className="ml-4 mt-4">
            Hủy bỏ
          </Button>
        </Link>
      </form>
    </>
  );
}

export default PostForm;
