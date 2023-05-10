import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, FormLabel, Input, Textarea, Select, FormErrorMessage, Badge } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import imageUpload from "../../assets/image-upload.jpg";
import PreviewImage from "../PreviewImage";
import { validationMultipleImage } from "../../utils/validationImage";
import { getAllCategory } from "../../api/categoryAPI";
import { editItem, postItem } from "../../api/postAPI";
function PostForm(props) {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isEdit, post } = props;
  const [errUpload, setErrUpload] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setValues } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      location: "",
      dateFoundLost: "",
      postType: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Vui lòng nhập tiêu đề bài viết!")
        .min(15, "Đồ dài nhỏ nhất nhất 15 kí tự")
        .max(150, "Đồ dài tối đa 150 kí tự!")
        .trim(),
      desc: Yup.string().max(255, "Đồ dài tối đa 255 kí tự!").trim(),
      location: Yup.string().required("Vui lòng nhập địa điểm!").trim(),
      postType: Yup.string().required("Vui lòng chọn loại bài viết!"),
      categoryId: Yup.string().required("Vui lòng chọn danh mục đồ vật!"),
    }),
    onSubmit: (values) => {
      if (!errUpload) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        formData.append("categoryId", values.categoryId);
        formData.append("location", values.location);
        formData.append("postType", values.postType);
        formData.append("dateFoundLost", values.dateFoundLost);
        if (files.length > 0) {
          for (const file of files) {
            formData.append("images", file);
          }
        }
        setIsLoading(true);

        if (isEdit) {
          formData.append("oldImages", oldImages);
          console.log(formData);
          handleEditPost(formData);
        } else {
          handleCreatePost(formData);
        }
      }
    },
  });
  const handleCreatePost = async (values) => {
    // CallAPi
    const { success } = await postItem(dispatch, values);
    if (success) {
      setIsLoading(false);
      resetForm();
      navigate("/");
    }
  };
  const handleEditPost = async (values) => {
    const { success } = await editItem(dispatch, post.id, values);
    if (success) {
      setIsLoading(false);
      resetForm();
      navigate("/");
    }
  };
  const handlePhotoChange = (e) => {
    const error = validationMultipleImage(e.target.files);
    if (error) {
      setErrUpload(error);
    } else {
      setFiles([...files, ...e.target.files]);
    }
  };
  const handleRemoveImage = (nameFile) => {
    setFiles(
      files.filter((file, index) => {
        console.log(file, index);
        return file.name !== nameFile;
      })
    );
  };
  setValues;
  useEffect(() => {
    const fetchAllCategory = async () => {
      await getAllCategory(dispatch);
    };
    fetchAllCategory();
  }, []);
  useEffect(() => {
    isEdit &&
      setValues({
        title: post?.title,
        desc: post?.desc,
        location: post?.location,
        postType: post?.postType,
        categoryId: post?.categoryId,
        dateFoundLost: post?.dateFoundLost,
      });
    post?.images?.length > 0 && setOldImages(post?.images);
  }, [post]);
  return (
    <>
      <h1 className="text-3xl text-primary text-center font-bold">
        {!isEdit ? "ĐĂNG HỒ SƠ ĐỒ VẬT" : "CHỈNH SỬA HỒ SƠ ĐỒ VẬT"}
      </h1>
      <form onSubmit={handleSubmit} className="py-8">
        <div className="lg:flex-row flex-col flex gap-5">
          <div className="xl:w-3/5 lg:w-2/4">
            <FormControl className="mt-4" isInvalid={errors.title && touched.title}>
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
              {errors.title && touched.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
            </FormControl>
            <FormControl className="mt-4" isInvalid={errors.desc && touched.desc}>
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
              {errors.desc && touched.desc && <FormErrorMessage>{errors.desc}</FormErrorMessage>}
            </FormControl>
            <FormControl className="mt-4" isInvalid={errors.location && touched.location}>
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
              {errors.location && touched.location && <FormErrorMessage>{errors.location}</FormErrorMessage>}
            </FormControl>
          </div>
          <div className="xl:w-2/5 lg:w-2/4">
            <div className="flex gap-5">
              <FormControl className="mt-4" isInvalid={errors.postType && touched.postType}>
                <FormLabel htmlFor="postType">Loại bài viết</FormLabel>
                <Select
                  placeholder="Chọn Loại bài viết"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.postType}
                  name="postType"
                >
                  <option value={"Found item"}>Tìm thấy</option>
                  <option value={"Lost item"}>Bị mất</option>
                </Select>
                {errors.postType && touched.postType && <FormErrorMessage>{errors.postType}</FormErrorMessage>}
              </FormControl>
              <FormControl className="mt-4" isInvalid={errors.categoryId && touched.categoryId}>
                <FormLabel htmlFor="categoryId">Danh mục đồ vật</FormLabel>
                <Select
                  placeholder="Chọn danh mục"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.categoryId}
                  name="categoryId"
                >
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
                {errors.categoryId && touched.categoryId && <FormErrorMessage>{errors.categoryId}</FormErrorMessage>}
              </FormControl>
            </div>

            <FormControl className="mt-4" isInvalid={errors.dateFoundLost && touched.dateFoundLost}>
              <FormLabel htmlFor="dateFoundLost">
                {values?.postType === "Found item" ? "Ngày tìm thấy" : "Ngày bị mất"}{" "}
              </FormLabel>

              <Input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateFoundLost}
                id="dateFoundLost"
                name="dateFoundLost"
                type="date"
                placeholder="Ngày tìm thấy hoặc bị mất"
              />
              {errors.dateFoundLost && touched.dateFoundLost && (
                <FormErrorMessage>{errors.dateFoundLost}</FormErrorMessage>
              )}
            </FormControl>
          </div>
        </div>
        <div className="flex gap-10 mt-4 mb-12 items-start">
          <div className="w-40 h-40">
            <FormControl isInvalid={errUpload}>
              <FormLabel>Hình Ảnh</FormLabel>
              <FormLabel htmlFor="images" className="block border-dashed border-4 cursor-pointer">
                <img src={imageUpload} alt="" />
              </FormLabel>

              <Input hidden onChange={handlePhotoChange} id="images" name="images" type="file" multiple></Input>
              <span className="text-gray-400 text-s block">File type: jpg, jpeg, png</span>
              {errUpload && <FormErrorMessage>{errUpload}</FormErrorMessage>}
            </FormControl>
          </div>
          <div className="w-[85%]">
            <div>
              {oldImages && oldImages.length > 0 ? (
                <h3 className="font-semibold">
                  <Badge ml="1" colorScheme="red">
                    Old
                  </Badge>
                </h3>
              ) : null}
              <div className="flex gap-5 mt-2">
                {oldImages && oldImages.length > 0
                  ? oldImages.map((img, index) => {
                      return (
                        <figure className="relative" key={index}>
                          <img src={img} alt="img" className="w-40 h-40 object-cover" />
                          <span
                            onClick={async () => {
                              setOldImages(oldImages.filter((src) => img !== src));
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex justify-center items-center cursor-pointer bg-gray-400 hover:bg-gray-500"
                          >
                            <box-icon name="x" color="white"></box-icon>
                          </span>
                        </figure>
                      );
                    })
                  : null}
              </div>
            </div>
            <PreviewImage files={files} handleRemove={handleRemoveImage} />
          </div>
        </div>
        <Button type="sumbit" colorScheme="facebook" isLoading={isLoading}>
          {!isEdit ? "Đăng" : "Lưu"}
        </Button>
        <Link to={"/"}>
          <Button colorScheme="pink" className="ml-4">
            Hủy bỏ
          </Button>
        </Link>
      </form>
    </>
  );
}

export default PostForm;
