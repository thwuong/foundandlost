import React from "react";
function PostItem() {
  return (
    <div className="p-4 bg-white/70 rounded-lg">
      <div className="flex justify-between items-start gap-2">
        <figure>
          <img
            src="http://bizweb.dktcdn.net/thumb/grande/100/318/659/products/xr-white-jpeg-9d9643bb-fc2d-4aa7-9568-d1464713db43.jpg?v=1587532259273"
            alt="test"
            className="w-28 rounded"
          />
        </figure>
        <p className="p-1 text-primary  font-bold inline-block bg-primary/10 border border-primary rounded">
          Tìm thấy
        </p>
      </div>

      <h3 className="my-2 font-bold text-xl text-primary/80 line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum velit
        incidunt hic.
      </h3>
      <div className="my-2 flex items-center gap-1">
        <box-icon type="solid" name="map" size="sm" color="gray"></box-icon>
        <span className="text-paragarph-black/50 font-medium">Đà nẵng</span>
      </div>
      <div className="w-full py-2 bg-primary/90 hover:bg-primary rounded flex items-center justify-center cursor-pointer">
        <span className="text-paragarph-white font-bold">Chi tiết</span>
        <box-icon type="solid" name="right-arrow-alt" color="white"></box-icon>
      </div>
    </div>
  );
}

export default PostItem;
