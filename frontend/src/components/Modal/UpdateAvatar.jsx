import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../api/userAPI";

function UpdateAvatar(props) {
  const { hide } = props;
  const [avatar, setAvatar] = useState("");
  const [err, setError] = useState("");
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    const { size, name } = e.target.files[0];
    if (size >= 5242880) return setError("Tệp tin quá lớn");
    if (!["jpg", "png", "jpeg"].includes(name.split(".")[1])) {
      return setError("Không hỗ trợ loại file này");
    }

    setAvatar(e.target.files[0]);
  };
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (!err) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      await updateProfile(formData, dispatch);
      hide();
    }
  };
  useEffect(() => {
    if (!avatar) return;

    const elPreview = URL.createObjectURL(avatar);
    setPreview(elPreview);
    return () => {
      URL.revokeObjectURL(elPreview);
    };
  }, [avatar]);
  return (
    <form onSubmit={hanldeSubmit}>
      <FormControl className="mb-4" isInvalid={err}>
        <FormLabel htmlFor="avatar" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-gray-600 rounded-lg">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Nhấn để tải ảnh lên</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPEG, PNG, JPG
            </p>
          </div>
        </FormLabel>
        <Input
          className="hidden"
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
        />
        {err && <FormErrorMessage>{err}</FormErrorMessage>}
      </FormControl>
      {preview ? (
        <figure className="my-4">
          <img
            src={preview}
            alt="preview"
            className="mx-auto w-28 h-28 object-cover rounded-full"
          />
        </figure>
      ) : null}
      <Button type="submit" colorScheme={"messenger"}>
        Cập nhật
      </Button>
      <Button onClick={hide} ml={4} colorScheme={"pink"} variant="outline">
        Hủy
      </Button>
    </form>
  );
}

export default UpdateAvatar;
