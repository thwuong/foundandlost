import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Select } from "@chakra-ui/react";
import PostTable from "../components/Manage/PostTable";
import Navigate from "../components/Manage/Navigate";
import { useDispatch } from "react-redux";
import { getItemList } from "../api/postAPI";
function ManagePost() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("DESC");
  useEffect(() => {
    const fetchAllPost = async (params) => {
      await getItemList(dispatch, params);
    };
    fetchAllPost({ sort });
  }, [sort]);
  return (
    <div className="bg-main-light bg-no-repeat bg-cover min-h-screen">
      <div className="h-full sm:px-0 px-2 sm:w-11/12 w-full mx-auto overflow-hidden min-h-screen">
        <Header activeTab="manage" />
        <h1 className="my-6 text-primary text-3xl text-center font-bold">DANH SÁCH HỒ SƠ ĐỒ VẬT</h1>

        <div className="xl:flex-row flex flex-col gap-5 mt-4 h-3/5">
          <div className="xl:w-1/5">
            <Navigate activeNav="post" />
          </div>
          <div className="xl:w-4/5 h-full">
            <div className="xl:w-1/6 ml-auto mb-4">
              <Select
                placeholder="Ngày đăng"
                bgColor={"white"}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="DESC">Mới nhất</option>
                <option value="ASC">Cũ nhất</option>
              </Select>
            </div>
            <div className=" bg-white/20 rounded-lg shadow-xl max-h-full overflow-y-auto">
              <PostTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePost;
