import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import CategogyTable from "../components/Manage/CategogyTable";
import Navigate from "../components/Manage/Navigate";
import InstanceModal from "../components/Modal/InstanceModal";
import CategoryFrom from "../components/Modal/CategoryFrom";

function ManageCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="bg-main bg-no-repeat bg-cover">
        <div className="h-full sm:px-0 px-2 sm:w-11/12 w-full mx-auto overflow-hidden min-h-screen">
          <Header activeTab="manage" />
          <h1 className="my-6 text-primary text-3xl text-center font-bold">QUẢN LÝ DANH MỤC ĐỒ VẬT</h1>

          <div className="xl:flex-row flex flex-col gap-5 mt-4 h-3/5">
            <div className="xl:w-1/5">
              <Navigate activeNav="category" />
            </div>
            <div className="xl:w-4/5 h-full">
              <div
                onClick={onOpen}
                className="px-3 py-2 w-44 mb-4 ml-auto rounded duration-200 bg-primary flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/90"
              >
                <span className="font-bold text-white">Tạo Danh mục</span>
                <box-icon name="user-plus" color="white"></box-icon>
              </div>
              <div className="bg-white/20 rounded-lg max-h-full overflow-y-auto">
                <CategogyTable />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstanceModal
        show={isOpen}
        modalName={"Thêm Danh mục"}
        hide={onClose}
        content={<CategoryFrom hide={onClose} />}
      />
    </>
  );
}

export default ManageCategory;
