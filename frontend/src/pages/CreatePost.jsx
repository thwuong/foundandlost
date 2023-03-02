import React, { useState } from "react";
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
} from "@chakra-ui/react";
import imageUpload from "../assets/image-upload.jpg";
import Header from "../components/Header";
import PreviewImage from "../components/PreviewImage";
import { validationMultipleImage } from "../utils/validationImage";
function CreatePost() {
  const [errUpload, setErrUpload] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Vui lòng nhập tiêu đề bài viết!")
      .min(15, "Đồ dài nhỏ nhất nhất 15 kí tự")
      .max(150, "Đồ dài tối đa 150 kí tự!"),
    desc: Yup.string().max(255, "Đồ dài tối đa 255 kí tự!"),
    location: Yup.string().required("Vui lòng nhập địa điểm!"),
    postType: Yup.string().required("Vui lòng chọn loại bài viết!"),
    categoryId: Yup.string().required("Vui lòng chọn danh mục đồ vật!"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      location: "",
      postType: "",
      categoryId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!errUpload) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          handleSubmit(values);
        }, 2000);
      }
    },
  });
  const handleSubmit = (values) => {
    console.log(values);
    // CallAPi
  };
  const handlePhotoChange = (e) => {
    const error = validationMultipleImage(e.target.files);
    if (error) {
      setErrUpload(error);
    } else {
      setFiles(e.target.files);
      formik.values.images = e.target.files;
    }
  };
  const renderError = (message) => {
    return <p className="text-sm font-bold text-rose-400 mt-1">{message}</p>;
  };
  return (
    <div className="xl:w-[80%] mx-auto">
      <div className="container mx-auto">
        <Header />
        <h1 className="text-3xl text-primary text-center font-bold">
          ĐĂNG ĐỒ VẬT
        </h1>
        <form onSubmit={formik.handleSubmit} className="py-8">
          <div className="flex gap-10">
            <div className="w-[55%]">
              <FormControl className="mt-4">
                <FormLabel htmlFor="title">Tiêu đề</FormLabel>
                <Input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Nhập tiêu đề"
                  isInvalid={formik.errors.title && formik.touched.title}
                />
                {formik.errors.title &&
                  formik.touched.title &&
                  renderError(formik.errors.title)}
              </FormControl>
              <FormControl className="mt-4">
                <FormLabel htmlFor="desc">Mô tả</FormLabel>

                <Textarea
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  className="h-[130px]"
                  as="textarea"
                  id="desc"
                  name="desc"
                  placeholder="Nhập mô tả"
                  resize="none"
                  isInvalid={formik.errors.desc && formik.touched.desc}
                />
                {formik.errors.desc &&
                  formik.touched.desc &&
                  renderError(formik.errors.desc)}
              </FormControl>
            </div>
            <div className="w-[45%]">
              <div className="flex gap-5">
                <FormControl className="mt-4">
                  <FormLabel htmlFor="postType">Loại bài viết</FormLabel>
                  <Select
                    placeholder="Chọn Loại bài viết"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.postType}
                    name="postType"
                    isInvalid={
                      formik.errors.postType && formik.touched.postType
                    }
                  >
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                  </Select>
                  {formik.errors.postType &&
                    formik.touched.postType &&
                    renderError(formik.errors.postType)}
                </FormControl>
                <FormControl className="mt-4">
                  <FormLabel htmlFor="categoryId">Danh mục đồ vật</FormLabel>
                  <Select
                    placeholder="Chọn danh mục"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                    name="categoryId"
                    isInvalid={
                      formik.errors.categoryId && formik.touched.categoryId
                    }
                  >
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                  </Select>
                  {formik.errors.categoryId &&
                    formik.touched.categoryId &&
                    renderError(formik.errors.categoryId)}
                </FormControl>
              </div>
              <FormControl className="mt-4">
                <FormLabel htmlFor="location">Địa điểm</FormLabel>

                <Input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Địa điểm đồ vật được tìm thấy hoặc thất lạc"
                  isInvalid={formik.errors.location && formik.touched.location}
                />
                {formik.errors.location &&
                  formik.touched.location &&
                  renderError(formik.errors.location)}
              </FormControl>
            </div>
          </div>
          <div className="flex gap-10 mt-4 items-start">
            <div className="w-[30%]">
              <FormControl>
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
                {errUpload && renderError(errUpload)}
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
            Đăng bài
          </Button>
          <Link to={"/"}>
            <Button colorScheme="pink" className="ml-4 mt-4">
              Hủy bỏ
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
