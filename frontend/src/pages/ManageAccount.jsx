import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import AccountTable from "../components/Manage/AccountTable";
import Navigate from "../components/Manage/Navigate";
import InstanceModal from "../components/Modal/InstanceModal";
import AccountForm from "../components/Modal/AccountForm";
function ManageAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([
    {
      id: 1,
      code: "B1906585",
      fullName: "Dương Anh Thương",
      email: "Dthuong@gmail.com",
      avatar:
        "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      phone: "0794290085",
      address: "Ninh kiều, Cần thơ",
      createdAt: Date.now() - 10,
    },
    {
      id: 2,
      code: "B1910120",
      fullName: "Tiết Ngọc Như",
      email: "tnNhu@gmail.com",
      avatar:
        "https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo",
      phone: "0367865123",
      address: "Cái răng, Cần Thơ",
      createdAt: Date.now(),
    },
  ]);

  return (
    <>
      <div className="bg-main bg-no-repeat bg-cover">
        <div className="w-[80%] h-screen mx-auto">
          <Header activeTab="manage" />
          <h1 className="my-6 text-primary text-3xl text-center font-bold">
            QUẢN LÝ TÀI KHOẢN
          </h1>
          <div
            onClick={onOpen}
            className="px-3 py-2 w-40 ml-auto rounded duration-200 bg-primary flex items-center gap-2 cursor-pointer hover:bg-primary/90"
          >
            <span className="font-bold text-white">Tạo tài khoản</span>
            <box-icon name="user-plus" color="white"></box-icon>
          </div>
          <div className="flex gap-5 mt-4 h-[55%]">
            <div className="w-[20%]">
              <Navigate activeNav="account" />
            </div>
            <div className="w-[80%]">
              <div className="py-8 px-4 bg-white/20 rounded-lg  overflow-y-auto">
                <AccountTable dataList={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstanceModal
        show={isOpen}
        modalName={"Thêm tài khoản"}
        hide={onClose}
        content={<AccountForm hide={onClose} />}
      />
    </>
  );
}

export default ManageAccount;
