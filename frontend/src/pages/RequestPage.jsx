import React from "react";
import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import ProfileNav from "../components/Profile/ProfileNav";
import Request from "../components/Profile/Request";
function RequestPage() {
  return (
    <div className="bg-[#F0F2F5]">
      <div className="w-[80%] mx-auto ">
        <div className="container h-full">
          <Header />
          <div className="bg-white p-4 rounded-lg ">
            <InfoPane />
          </div>
          <div className="mt-6">
            <ProfileNav activeTab="request" />
          </div>
          <div className="flex gap-5 mt-6">
            <div className="w-[30%]">
              <IntroPane />
            </div>
            <div className="w-[70%] max-h-[420px] min-h-[320px] overflow-y-auto">
              <Request me={true} />
              <Request me={true} />
              <Request me={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
