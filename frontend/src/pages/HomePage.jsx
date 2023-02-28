import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import PostItem from "../components/PostItem";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import SelectCategory from "../components/SelectCategory";

function HomePage() {
  const [pagination, setPagination] = useState({
    _limit: 8,
    _page: 1,
    _totalRows: 50,
  });
  const [filters, setFilters] = useState({
    _limit: 8,
    _page: 1,
    text: "",
    category: null,
    typePost: null,
  });
  const [tab, setTab] = useState("all");

  const handlePageChange = (newPage) => {
    console.log(newPage);
  };
  const handleSelecting = (selectedCategory) => {
    console.log(selectedCategory);
  };
  const handleSearching = (newKeyWord) => {
    console.log(newKeyWord);
  };
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  return (
    <div className="bg-main bg-no-repeat bg-cover">
      <div className="w-[80%] xl:min-h-screen mx-auto">
        <div className="container">
          <Header />
          <h1 className="text-5xl text-primary font-bold text-center">
            Found & Lost List
          </h1>
          <div className="mt-8 grid xl:grid-cols-12 gap-5">
            <div className="xl:col-span-3 flex gap-3">
              <button
                className={
                  (tab === "all"
                    ? "bg-primary text-paragarph-white"
                    : "bg-transparent text-paragarph-black border-2 border-primary") +
                  " text-center px-4 py-2 rounded-lg font-bold"
                }
                onClick={() => {
                  setTab("all");
                }}
              >
                Tất cả
              </button>
              <button
                onClick={() => {
                  setTab("lost");
                }}
                className={
                  (tab === "lost"
                    ? "bg-primary text-paragarph-white"
                    : "bg-transparent text-paragarph-black border-2 border-primary") +
                  " text-center px-4 py-2 rounded-lg font-bold"
                }
              >
                Bị mất
              </button>
              <button
                onClick={() => {
                  setTab("found");
                }}
                className={
                  (tab === "found"
                    ? "bg-primary text-paragarph-white"
                    : "bg-transparent text-paragarph-black border-2 border-primary") +
                  " text-center px-4 py-2 rounded-lg font-bold"
                }
              >
                Tìm thấy
              </button>
            </div>
            <div className="xl:col-span-5">
              <Search onSearch={handleSearching} />
            </div>
            <div className="xl:col-span-2">
              <SelectCategory onSelect={handleSelecting} />
            </div>
            <div className="xl:col-span-2 flex justify-center items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary hover:bg-primary/90">
              <box-icon name="plus-circle" color="white"></box-icon>
              <span className="font-bold text-paragarph-white">
                Đăng đồ vật
              </span>
            </div>
          </div>
          <div className="py-8 grid xl:grid-cols-4 gap-5">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
          <Pagination onPageChange={handlePageChange} pagination={pagination} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
