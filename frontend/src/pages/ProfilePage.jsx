import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import InfoPane from "../components/Profile/InfoPane";
import IntroPane from "../components/Profile/IntroPane";
import CardList from "../components/Profile/CardList";
import ProfileNav from "../components/Profile/ProfileNav";

import { useDispatch } from "react-redux";
import { getMyProfile, getUser } from "../api/userAPI";
import { getMyItems, getUserItems } from "../api/postAPI";
import { getRequestList } from "../api/requetsAPI";
import { createConversation } from "../api/conversationAPI";
function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectedChat = async (receiverId) => {
    await createConversation(dispatch, { receiver: receiverId });
    navigate("/chat");
  };

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
    const fetchListRequets = async () => {
      await getRequestList(dispatch);
    };
    if (userId) {
      fetchProfileById(userId);
      fetchUserItems(userId);
    } else {
      fetchProfile();
      fetchMyItems();
      fetchListRequets();
    }
  }, [userId]);
  return (
    <div className="bg-[#F0F2F5] min-h-screen">
      <div className="sm:w-4/5 sm:px-0 px-2 w-full mx-auto overflow-hidden">
        <div className="container h-full">
          <Header />
          <div className="bg-white p-4 rounded-lg ">
            <InfoPane handleSelectedChat={handleSelectedChat} />
          </div>
          <div className="mt-6">
            <ProfileNav activeTab="post" />
          </div>
          <div className="lg:flex-row flex-col flex gap-5 mt-6">
            <div className="xl:w-1/4 ">
              <IntroPane />
            </div>
            <div className="xl:w-3/4 max-h-[760px] overflow-y-auto">
              <CardList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
