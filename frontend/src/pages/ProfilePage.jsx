import React, { useState } from "react";
import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import CardList from "../components/Profile/CardList";
import ProfileNav from "../components/Profile/ProfileNav";
function ProfilePage() {
  return (
    <div className="bg-[#F0F2F5] min-h-screen">
      <div className="w-[80%] mx-auto ">
        <div className="container h-full">
          <Header />
          <div className="bg-white p-4 rounded-lg ">
            <InfoPane />
          </div>
          <div className="mt-6">
            <ProfileNav activeTab="post" />
          </div>
          <div className="flex gap-5 mt-6">
            <div className="w-[30%]">
              <IntroPane />
            </div>
            <div className="w-[70%] max-h-[760px] overflow-y-auto">
              <CardList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
