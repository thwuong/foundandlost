import React from "react";
import { Badge } from "@chakra-ui/react";
function PostItem(props) {
  return (
    <div className="p-4 bg-white/40 rounded-lg">
      <div className="flex justify-between items-start gap-2">
        <figure>
          <img
            src="http://bizweb.dktcdn.net/thumb/grande/100/318/659/products/xr-white-jpeg-9d9643bb-fc2d-4aa7-9568-d1464713db43.jpg?v=1587532259273"
            alt="test"
            className="w-28 rounded"
          />
        </figure>
        {/* Yellow = thất lạc, messenger = tìm thấy */}
        <Badge variant="outline" colorScheme="messenger">
          Tìm thấy
        </Badge>
      </div>

      <h3 className="my-2 font-bold text-xl text-primary/80 line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum velit
        incidunt hic.
      </h3>
      <div className="my-2 flex items-center gap-1">
        <box-icon type="solid" name="map" size="sm" color="gray"></box-icon>
        <span className="text-paragarph-black/60 font-medium">Đà nẵng</span>
      </div>
      <div className="w-full py-2 bg-primary/90 hover:bg-primary rounded flex items-center justify-center gap-2 cursor-pointer">
        <span className="text-paragarph-white font-bold">Chi tiết</span>
        <box-icon name="expand-alt" color="white"></box-icon>
      </div>
    </div>
  );
}

export default PostItem;
