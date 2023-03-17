import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import AccountTable from "../components/Manage/AccountTable";
import Navigate from "../components/Manage/Navigate";
import InstanceModal from "../components/Modal/InstanceModal";
import AccountForm from "../components/Modal/AccountForm";
function ManageAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <div className="flex gap-5 mt-4 h-3/5">
            <div className="w-[20%]">
              <Navigate activeNav="account" />
            </div>
            <div className="w-[80%] h-full">
              <div className="bg-white/20 rounded-lg max-h-full shadow-xl overflow-y-auto">
                <AccountTable />
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
