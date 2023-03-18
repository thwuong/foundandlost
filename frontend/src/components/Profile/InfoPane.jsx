import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import InstanceModal from "../Modal/InstanceModal";
import UpdateAvatar from "../Modal/UpdateAvatar";
import UpdateInfo from "../Modal/UpdateInfo";
import ChangePassword from "../Modal/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, getUser } from "../../api/userAPI";
function InfoPane() {
  const { userId } = useParams();
  const { profile, posts } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const {
    isOpen: isOpenUpdateAvatar,
    onOpen: onOpenUpdateAvatar,
    onClose: onCloseUpdateAvatar,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdateInfo,
    onOpen: onOpenUpdateInfo,
    onClose: onCloseUpdateInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenChangePassword,
    onOpen: onOpenChangePassword,
    onClose: onCloseChangePassword,
  } = useDisclosure();
  useEffect(() => {
    const fetchProfile = async () => {
      await getMyProfile(dispatch);
    };
    const fetchProfileById = async (userId) => {
      await getUser(userId, dispatch);
    };
    if (userId) {
      fetchProfileById(userId);
    } else {
      fetchProfile();
    }
  }, []);
  return (
    <>
      <div className="flex gap-4">
        <figure className="relative p-1 border-2 rounded-full cursor-pointer hover:border-black/20">
          <img
            className="w-40 h-40 object-cover rounded-full "
            src={profile.avatar}
            alt=""
          />
          <div
            onClick={onOpenUpdateAvatar}
            className="absolute bottom-1 right-4 w-8 h-8 flex items-center justify-center p-1 bg-gray-200 rounded-full cursor-pointer"
          >
            <box-icon name="camera"></box-icon>
          </div>
        </figure>
        <div>
          <h3 className="text-xl font-bold">{profile.fullName}</h3>
          <p className="my-2 text-gray-400 text-sm">
            {profile.isAdmin ? "Quản trị viên" : "Sinh viên"}
          </p>
          <p className="font-bold">
            Số lượng bài viết:<span> {posts && posts.length}</span>
          </p>
        </div>
        <div className="ml-auto flex flex-row-reverse items-end justify-end gap-4">
          {user.id === profile.id ? (
            <div
              onClick={onOpenChangePassword}
              className="px-3 py-2 rounded bg-gray-300 flex gap-1 items-center cursor-pointer duration-300 hover:bg-gray-300/75"
            >
              <box-icon name="lock-alt"></box-icon>
              <span>Thay đổi mật khẩu</span>
            </div>
          ) : null}
          {user.id === profile.id ? (
            <div
              onClick={onOpenUpdateInfo}
              className="px-3 py-2 rounded bg-gray-300 flex gap-1 items-center cursor-pointer duration-300 hover:bg-gray-300/75"
            >
              <box-icon name="pencil" type="solid"></box-icon>
              <span>Chỉnh sửa thông tin</span>
            </div>
          ) : null}
          {user.id !== profile.id ? (
            <Link to={"/chat"}>
              <div className="px-3 py-2 rounded text-white bg-primary flex gap-1 items-center justify-center cursor-pointer duration-300 hover:bg-primary/90">
                <box-icon type="logo" name="messenger" color="white"></box-icon>
                <span>Nhắn tin</span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
      <InstanceModal
        show={isOpenUpdateAvatar}
        modalName={"Cập nhật ảnh đại diện"}
        hide={onCloseUpdateAvatar}
        content={<UpdateAvatar hide={onCloseUpdateAvatar} />}
      />
      <InstanceModal
        show={isOpenUpdateInfo}
        modalName={"Cập nhật thông tin"}
        hide={onCloseUpdateInfo}
        content={<UpdateInfo hide={onCloseUpdateInfo} />}
      />
      <InstanceModal
        show={isOpenChangePassword}
        modalName={"Thay đổi mật khẩu"}
        hide={onCloseChangePassword}
        content={<ChangePassword hide={onCloseChangePassword} />}
      />
    </>
  );
}

export default InfoPane;
