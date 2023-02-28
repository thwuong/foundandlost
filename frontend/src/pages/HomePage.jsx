import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PostItem from "../components/PostItem";
import { Select } from "@chakra-ui/react";
import Pagination from "../components/Pagination";

function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [closeX, setCloseX] = useState(false);
  const [tab, setTab] = useState("all");
  const typingTimeoutRef = useRef(null);
  const handleSearching = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      console.log(value);
      // callApi
    }, 500);
  };
  const handleSelecting = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      console.log(value);
      // callApi
    }, 500);
  };
  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  return (
    <div className="bg-main">
      <div className="w-[80%] xl:min-h-screen mx-auto">
        <div className="container">
          <Header />
          <div className="mt-6">
            <div>
              <h1 className="text-5xl text-primary font-bold text-center">
                Found & Lost List
              </h1>
            </div>
          </div>
          <div className="mt-12 grid xl:grid-cols-12 gap-5">
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
            <div className="xl:col-span-5 relative flex items-center gap-4 rounded-lg">
              <span className="absolute top-2.5 left-3">
                <box-icon name="search-alt-2" color="gray"></box-icon>
              </span>
              <input
                value={keyword}
                onChange={handleSearching}
                type="text"
                placeholder="Tìm kiếm"
                className="w-full px-12 py-2 outline-none rounded-lg bg-black/10 focus:bg-transparent focus:border-primary focus:border-2"
              />
              {closeX && (
                <span
                  className="absolute top-2.5 right-3 cursor-pointer"
                  onClick={() => {
                    setKeyword("");
                  }}
                >
                  <box-icon name="x" color="gray"></box-icon>
                </span>
              )}
            </div>
            <div className="xl:col-span-2">
              <Select placeholder="Chọn Danh mục" onChange={handleSelecting}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
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
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
