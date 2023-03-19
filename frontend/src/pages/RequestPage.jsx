import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import ProfileNav from "../components/Profile/ProfileNav";

import { getMyRequests } from "../api/requetsAPI";
import { getMyProfile } from "../api/userAPI";
import { getMyItems } from "../api/postAPI";
import RequestList from "../components/Profile/RequestList";
function RequestPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      await getMyProfile(dispatch);
    };

    const fetchMyRequets = async () => {
      await getMyRequests(dispatch);
    };
    const fetchMyItems = async () => {
      await getMyItems(dispatch);
    };
    fetchProfile();
    fetchMyItems();
    fetchMyRequets();
  }, []);
  return (
    <div className="bg-[#F0F2F5] min-h-screen">
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
              <RequestList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
