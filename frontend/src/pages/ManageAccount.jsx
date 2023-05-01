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
      <div className="bg-main-light bg-no-repeat bg-cover min-h-screen h-full">
        <div className="h-full sm:px-0 px-2 sm:w-11/12 w-full mx-auto overflow-hidden min-h-screen">
          <Header activeTab="manage" />
          <h1 className="my-6 text-primary text-3xl text-center font-bold">QUẢN LÝ TÀI KHOẢN</h1>
          <div className="xl:flex-row flex flex-col gap-5 mt-4 xl:h-[60vh] 80vh">
            <div className="xl:w-1/5">
              <Navigate activeNav="account" />
            </div>
            <div className="xl:w-4/5 h-full">
              <div
                onClick={onOpen}
                className="px-3 py-2 w-40 mb-4 ml-auto rounded duration-200 bg-primary flex items-center gap-2 cursor-pointer hover:bg-primary/90"
              >
                <span className="font-bold text-white">Tạo tài khoản</span>
                <box-icon name="user-plus" color="white"></box-icon>
              </div>
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
