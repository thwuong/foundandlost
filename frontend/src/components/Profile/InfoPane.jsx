import React from "react";

function InfoPane() {
  return (
    <div className="flex gap-4">
      <figure className="relative p-1 border-2 rounded-full cursor-pointer hover:border-black/20">
        <img
          className="w-40 h-40 object-cover rounded-full "
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/328130832_1855564528161017_6159523852991919296_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3fW4Xt-sZP4AX-e5ja-&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBGLZ6DHKqRho2yN61BihgCUp11gpHMiAVHi12RJfWUqw&oe=640755EC"
          alt=""
        />
        <div className="absolute bottom-1 right-4 w-8 h-8 flex items-center justify-center p-1 bg-gray-200 rounded-full">
          <box-icon name="camera"></box-icon>
        </div>
      </figure>
      <div>
        <h3 className="text-xl font-bold">Thuong Dương</h3>
        <p className="my-2 text-gray-400 text-sm">Sinh viên</p>
        <p className="font-bold">
          Số lượng bài viết:<span> 12</span>
        </p>
      </div>
      <div className="ml-auto flex flex-row-reverse items-end justify-end gap-4">
        <div className="px-3 py-2 rounded bg-gray-300 flex gap-1 items-center cursor-pointer duration-300 hover:bg-gray-300/75">
          <box-icon name="pencil" type="solid"></box-icon>
          <span>Chỉnh sửa thông tin</span>
        </div>
        <div className="px-3 py-2 rounded text-white bg-primary flex gap-1 items-center justify-center cursor-pointer duration-300 hover:bg-primary/90">
          <box-icon type="logo" name="messenger" color="white"></box-icon>
          <span>Nhắn tin</span>
        </div>
      </div>
    </div>
  );
}

export default InfoPane;
