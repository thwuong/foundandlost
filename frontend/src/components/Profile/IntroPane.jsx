import React from "react";

function IntroPane(props) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-bold">Giới thiệu</h3>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="envelope" color="gray"></box-icon>
        <span className="text-ms text-gray-500">dt@gmail.com</span>
      </div>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="phone" color="gray"></box-icon>
        <span className="text-ms text-gray-500">0794290085</span>
      </div>
      <div className="mt-4 flex item-center gap-2">
        <box-icon name="map" color="gray"></box-icon>
        <span className="text-ms text-gray-500">Cái răng, cần thơ</span>
      </div>
    </div>
  );
}

export default IntroPane;
