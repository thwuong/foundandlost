import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/header-logo_500_500.png";
import moment from "moment";

import { logout } from "../api/authAPI";
import { deleteNotify, getAllNotify, pushNotify, readNotify } from "../api/notifyAPI";
import { selectConversation } from "../stores/ConversationSlice";
import { getConversation } from "../api/conversationAPI";
function Header(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const currentConversation = useSelector((state) => state.conversation.currentConversation);
  const notifications = useSelector((state) => state.notify.notifications);
  const { socket } = useSelector((state) => state.instanceSocket);
  const [showNotify, setShowNotify] = useState(false);
  const [arrNotify, setArrNotify] = useState(null);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout(dispatch);
  };
  const createNotify = async (payload) => {
    await pushNotify(dispatch, payload);
  };
  const handleMarkRead = async (notificationId, senderId) => {
    await readNotify(dispatch, notificationId);
    await getConversation(dispatch, senderId);
    navigate("/chat");
  };
  const removeNotice = async (notificationId) => {
    await deleteNotify(dispatch, notificationId);
  };
  useEffect(() => {
    socket?.on("recieveNotify", (data) => {
      setArrNotify(data);
    });
  }, [socket]);
  useEffect(() => {
    // add notify
    if (arrNotify && arrNotify.conversationId !== currentConversation?.id) {
      const newNotify = {
        type: "message",
        content: `gửi tin nhắn cho bạn`,
        recieverId: user.id,
        senderId: arrNotify.senderId,
      };

      createNotify(newNotify);
    }
  }, [arrNotify]);
  useEffect(() => {
    const fetchAllNotify = async () => {
      await getAllNotify(dispatch);
    };
    fetchAllNotify();
  }, []);
  return (
    <div className="h-28 flex justify-between items-center z-40 relative">
      <Link to={user?.isAdmin ? "/manage" : "/"} className="flex-1">
        <div className="h-28 xl:w-2/4 w-full flex items-center">
          <figure className="lg:w-2/6 sm:w-2/3 w-1/4">
            <img src={logo} alt="logo" className="object-cover" />
          </figure>
          <h1 className="xl:block hidden font-bold text-sm xl:w-2/5 italic">
            Chia sẻ hồ sơ đồ vật thất lạc cho sinh viên
          </h1>
        </div>
      </Link>
      <div className="relative">
        <p
          className="sm:hidden cursor-pointer"
          onClick={() => {
            setShowMenuMobile(!showMenuMobile);
          }}
        >
          <box-icon name="menu-alt-right"></box-icon>
        </p>
        <div
          className={`flex sm:items-center sm:flex-row flex-col sm:static absolute duration-300 top-10 -right-6 w-[90vw]
          sm:w-full sm:p-0 p-2 sm:bg-inherit bg-white sm:shadow-none sm:rounded-none shadow-xl rounded-lg z-10 sm:z-0 
          ${showMenuMobile ? "-translate-x-9" : "translate-x-full sm:translate-x-0"}
          `}
        >
          <ul className="mr-10 flex sm:flex-row flex-col sm:gap-10 gap-2">
            {user?.isAdmin ? (
              <Link to={"/manage"}>
                <li className={`text-lg font-medium  ${activeTab === "manage" ? "text-primary" : "text-black"}`}>
                  Quản Trị viên
                </li>
              </Link>
            ) : (
              <Link to={"/"}>
                <li className={`text-lg font-medium ${activeTab === "home" ? "text-primary" : "text-black"}`}>
                  Trang chủ
                </li>
              </Link>
            )}

            <li className={`text-lg font-medium cursor-pointer relative`}>
              {notifications && notifications?.filter((noti) => noti.isRead !== 1).length > 0 && (
                <p
                  className="absolute bottom-5 left-3 w-5 h-5 rounded-full text-sm bg-red-500/90 text-white 
                flex justify-center items-center"
                >
                  {notifications?.filter((noti) => noti.isRead !== 1).length}
                </p>
              )}

              <span
                onClick={() => {
                  setShowNotify(!showNotify);
                }}
              >
                <box-icon name="bell"></box-icon>
              </span>
              {showNotify && (
                <div
                  className="absolute top-10 right-0 w-80 bg-white shadow-2xl rounded-lg z-10 overflow-hidden 
                max-h-[80vh] overflow-y-auto"
                >
                  <ul className="py-2 bg-white">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((noti) => {
                        return (
                          <li
                            key={noti.id}
                            className={`relative flex gap-2 items-center justify-between px-2 py-3 rounded hover:bg-gray-200 `}
                          >
                            <img src={noti.sender.avatar} alt="" className="w-10 h-10 rounded-full" />
                            <div
                              onClick={() => {
                                handleMarkRead(noti.id, noti.senderId);
                              }}
                            >
                              <p className="text-sm">
                                {noti.sender.fullName}
                                <span className="ml-2 text-sm text-gray-500">{noti.content}</span>
                              </p>
                              <p className="text-s text-gray-500">{moment(noti.createdAt).fromNow()}</p>
                            </div>

                            {!noti.isRead && <p className="absolute right-10 w-2 h-2 rounded-full bg-blue-600"></p>}
                            <div
                              onClick={() => {
                                removeNotice(noti.id);
                              }}
                              className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 w-6 h-6 rounded-full"
                            >
                              <box-icon name="x"></box-icon>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-2">
                        <span className="text-sm ">Không có thông báo nào.</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          </ul>
          <div className="flex items-center relative group">
            <figure>
              <img
                src={user?.avatar}
                alt="Ảnh đại diện"
                className="w-8 h-8 object-cover overflow-hidden rounded-full cursor-pointer "
              />
            </figure>
            <div className="ml-2">
              <p className="text-primary font-bold">
                {user?.fullName} {user?.idNumber}
              </p>
              <p className="text-sm text-gray-500">{user?.isAdmin ? "Quản trị viên" : "Sinh viên"}</p>
            </div>
            <ul className="z-20 absolute overflow-hidden duration-300 top-6 w-full bg-white  rounded shadow-md opacity-0 invisible group-hover:top-12 group-hover:opacity-100 group-hover:visible">
              {!user.isAdmin && (
                <Link to={"/profile"}>
                  <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                    <box-icon type="solid" name="user-account"></box-icon>
                    <span>Thông tin cá nhân</span>
                  </li>
                </Link>
              )}
              {!user.isAdmin && (
                <Link to={"/profile/request"}>
                  <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                    <box-icon name="receipt"></box-icon>
                    <span>Quản lý yêu cầu</span>
                  </li>
                </Link>
              )}
              {!user.isAdmin && (
                <Link to={"/chat"}>
                  <li className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60">
                    <box-icon type="logo" name="messenger"></box-icon>
                    <span>Tin Nhắn</span>
                  </li>
                </Link>
              )}

              <li
                className="p-2 text-ms font-medium flex items-center gap-2 hover:bg-gray-300/60 cursor-pointer"
                onClick={handleLogout}
              >
                <box-icon name="exit"></box-icon>
                <span>Đăng xuất</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
