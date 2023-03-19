import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import CardList from "../components/Profile/CardList";
import ProfileNav from "../components/Profile/ProfileNav";

import { useDispatch } from "react-redux";
import { getMyProfile, getUser } from "../api/userAPI";
import { getMyItems, getUserItems } from "../api/postAPI";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      await getMyProfile(dispatch);
    };
    const fetchProfileById = async (userId) => {
      await getUser(userId, dispatch);
    };
    const fetchUserItems = async (userId) => {
      await getUserItems(dispatch, userId);
    };
    const fetchMyItems = async () => {
      await getMyItems(dispatch);
    };
    if (userId) {
      fetchProfileById(userId);
      fetchUserItems(userId);
    } else {
      fetchProfile();
      fetchMyItems();
    }
  }, [userId]);
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
