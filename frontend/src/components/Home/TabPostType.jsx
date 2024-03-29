import React, { useState } from "react";

function TabTypePost(props) {
  const [tab, setTab] = useState("");
  const { onTabChange } = props;

  const handleTabChange = (tabSelected) => {
    setTab(tabSelected);
    onTabChange(tabSelected);
  };
  return (
    <div className=" flex gap-3">
      <button
        className={
          (tab === ""
            ? "bg-primary text-paragarph-white"
            : "bg-transparent text-primary border-2 border-primary") +
          " text-center px-4 py-2 rounded-lg font-bold"
        }
        onClick={() => {
          handleTabChange("");
        }}
      >
        Tất cả
      </button>
      <button
        onClick={() => {
          handleTabChange("Lost item");
        }}
        className={
          (tab === "Lost item"
            ? "bg-primary text-paragarph-white"
            : "bg-transparent text-primary border-2 border-primary") +
          " text-center px-4 py-2 rounded-lg font-bold"
        }
      >
        Bị mất
      </button>
      <button
        onClick={() => {
          handleTabChange("Found item");
        }}
        className={
          (tab === "Found item"
            ? "bg-primary text-paragarph-white"
            : "bg-transparent text-primary border-2 border-primary") +
          " text-center px-4 py-2 rounded-lg font-bold"
        }
      >
        Tìm thấy
      </button>
    </div>
  );
}

export default TabTypePost;
