import React from "react";
import { useSelector } from "react-redux";
function IntroPane() {
  const profile = useSelector((state) => state.user.profile);
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-bold">Giới thiệu</h3>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="envelope" color="gray"></box-icon>
        <span className="text-ms text-gray-500">{profile.email}</span>
      </div>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="phone" color="gray"></box-icon>
        <span className="text-ms text-gray-500">{profile.phone}</span>
      </div>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="map" color="gray"></box-icon>
        <span className="text-ms text-gray-500">{profile.address}</span>
      </div>
    </div>
  );
}

export default IntroPane;
