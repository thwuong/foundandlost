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
      <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto overflow-hidden">
        <div className="container h-full">
          <Header />
          <div className="bg-white p-4 rounded-lg ">
            <InfoPane />
          </div>
          <div className="mt-6">
            <ProfileNav activeTab="request" />
          </div>
          <div className="lg:flex-row flex-col flex gap-5 mt-6">
            <div className="xl:w-1/4">
              <IntroPane />
            </div>
            <div className="xl:w-3/4 max-h-[420px] min-h-[320px] overflow-y-auto">
              <RequestList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
