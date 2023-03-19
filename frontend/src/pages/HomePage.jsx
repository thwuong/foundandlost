import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Search from "../components/Home/Search";
import Pagination from "../components/Home/Pagination";
import SelectCategory from "../components/Home/SelectCategory";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import TabTypePost from "../components/Home/TabTypePost";
import { getItemList } from "../api/postAPI";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  const { posts, totalPost } = useSelector((state) => state.post);
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
    totalRows: null,
  });
  const [filters, setFilters] = useState({
    limit: 8,
    page: 1,
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
    <div className="bg-main bg-no-repeat bg-cover">
      <div className="w-[80%] xl:min-h-screen mx-auto">
        <div className="container">
          <Header activeTab="home" />
          <h1 className="text-5xl mt-8 text-primary font-bold text-center">
            Found & Lost List
          </h1>
          <div className="mt-8 grid xl:grid-cols-12 gap-5">
            <div className="xl:col-span-3">
              <TabTypePost onTabChange={handleTabChange} />
            </div>
            <div className="xl:col-span-5">
              <Search onSearch={handleSearching} />
            </div>
            <div className="xl:col-span-2">
              <SelectCategory onSelect={handleSelecting} />
            </div>
            <div className="xl:col-span-2 ">
              <Link
                to={"/post/create-post"}
                className="flex justify-center items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary hover:bg-primary/90"
              >
                <box-icon name="plus-circle" color="white"></box-icon>
                <span className="font-bold text-paragarph-white">
                  Đăng đồ vật
                </span>
              </Link>
            </div>
          </div>
          <div className="py-8 grid xl:grid-cols-4 gap-5 ">
            {posts && posts.length > 0
              ? posts.map((post) => {
                  return <CardItem key={post.id} item={post} />;
                })
              : null}
          </div>
          <Pagination onPageChange={handlePageChange} pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
