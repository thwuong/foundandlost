import React, { useState } from "react";
import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import CardList from "../components/Profile/CardList";
function ProfilePage() {
  const [activeTab, setActiveTab] = useState("post");
  return (
    <div className="bg-[#F0F2F5]">
      <div className="w-[80%] min-h-screen mx-auto">
        <div className="container h-full">
          <Header />
          <div className="bg-white p-4 rounded-lg">
            <InfoPane />
          </div>
          <div className="mt-6">
            <ul className="flex">
              <li
                onClick={() => {
                  setActiveTab("post");
                }}
                className={`relative duration-300 px-3 py-3 rounded cursor-pointer font-medium  ${
                  activeTab === "post"
                    ? " text-primary after-active"
                    : "hover:bg-gray-200 text-gray-500"
                }`}
              >
                <span> Bài viết</span>
              </li>
              <li
                onClick={() => {
                  setActiveTab("request");
                }}
                className={`relative duration-300  px-3 py-3 rounded cursor-pointer font-medium  ${
                  activeTab === "request"
                    ? "text-primary after-active"
                    : "hover:bg-gray-200 text-gray-500"
                }`}
              >
                <span> Yêu cầu</span>
              </li>
            </ul>
          </div>
          <div className="flex gap-5 mt-6">
            <div className="w-[30%]">
              <IntroPane />
            </div>
            <div className="w-[70%] h-[380px] overflow-y-auto">
              <CardList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
