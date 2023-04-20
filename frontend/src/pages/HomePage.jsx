import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../customHooks/useLoading";

import Search from "../components/Home/Search";
import Pagination from "../components/Home/Pagination";
import SelectCategory from "../components/Home/SelectCategory";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import TabPostType from "../components/Home/TabPostType";
import PostSkeleton from "../components/Loading/PostSkeleton";

import { getItemList } from "../api/postAPI";

function HomePage() {
  const dispatch = useDispatch();
  const loading = useLoading();
  const { posts, totalPost } = useSelector((state) => state.post);
  const [pagination, setPagination] = useState({
    _limit: 6,
    _page: 1,
    totalRows: null,
  });
  const [filters, setFilters] = useState({
    _limit: 6,
    _page: 1,
    keyword: "",
    categoryId: null,
    postType: null,
  });
  const handleTabChange = (tabSelected) => {
    setFilters({ ...filters, postType: tabSelected });
  };
  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, _page: newPage });
    setFilters({ ...filters, _page: newPage });
  };
  const handleSelecting = (categorySelected) => {
    setFilters({ ...filters, categoryId: categorySelected });
  };
  const handleSearching = (newKeyWord) => {
    setFilters({ ...filters, keyword: newKeyWord });
  };
  useEffect(() => {
    setPagination({ ...pagination, totalRows: totalPost });
  }, [totalPost]);
  useEffect(() => {
    const fetchAllItem = async (params) => {
      await getItemList(dispatch, params);
    };
    fetchAllItem(filters);
  }, [filters]);

  return (
    <div className="bg-main bg-no-repeat bg-cover min-h-screen overflow-hidden">
      <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto">
        <div className="container ">
          <Header activeTab="home" />
          <h1 className="text-5xl mt-8 text-primary font-bold text-center">Found & Lost List</h1>
          <div className="mt-8 grid xl:grid-cols-12 gap-5 p-2 bg-white shadow-xl rounded-xl">
            <div className="xl:col-span-3 md:col-span-3">
              <TabPostType onTabChange={handleTabChange} />
            </div>
            <div className="xl:col-span-5 md:col-span-3">
              <Search onSearch={handleSearching} />
            </div>
            <div className="xl:col-span-2 md:col-span-3">
              <SelectCategory onSelect={handleSelecting} />
            </div>
            <div className="xl:col-span-2  md:col-span-3">
              <Link
                to={"/post/create-post"}
                className="flex justify-center items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary hover:bg-primary/90"
              >
                <box-icon name="plus-circle" color="white"></box-icon>
                <span className="font-bold text-paragarph-white">Đăng đồ vật</span>
              </Link>
            </div>
          </div>
          {loading ? (
            <PostSkeleton />
          ) : (
            <div className="py-8 grid xl:grid-cols-2 grid-cols-1 gap-5 ">
              {posts && posts.length > 0 ? (
                posts.map((post) => {
                  return <CardItem key={post.id} item={post} />;
                })
              ) : (
                <p className="text-center">
                  Không có đồ vật của bạn muốn,{" "}
                  <Link className="text-teal-500" to={"/post/create-post"}>
                    Click để đăng tìm
                  </Link>
                </p>
              )}
            </div>
          )}
          <Pagination onPageChange={handlePageChange} pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
