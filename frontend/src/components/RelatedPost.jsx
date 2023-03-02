import React from "react";

function RelatedPost(props) {
  return (
    <div className="bg-black/10 p-4 rounded-lg">
      <h3 className="text-xl text-center font-bold">Bài viết liên quan</h3>
      <p className="mt-2 ml-2 text-sm text-primary font-bold">#Công nghệ</p>
      <ul className="overflow-y-auto h-[380px]">
        <li className="mt-2 flex items-center px-2 py-1 bg-primary/20 rounded gap-2">
          <figure>
            <img
              className="flex-1 h-12 rounded object-cover"
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt=""
            />
          </figure>
          <div className="w-[80%]">
            <h5 className="text-lg font-bold truncate">
              Lorem ipsum dolor sit amet.
            </h5>
            <div className="flex items-center gap-2">
              <box-icon name="map" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                Nhà học C1,Đại học cần thơ{" "}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <box-icon name="time" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                {new Date(2312723423).toLocaleDateString()}
              </span>
            </div>
          </div>
        </li>
        <li className="mt-2 flex items-center px-2 py-1 bg-primary/20 rounded gap-2">
          <figure>
            <img
              className="flex-1 h-12 rounded object-cover"
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt=""
            />
          </figure>
          <div className="w-[80%]">
            <h5 className="text-lg font-bold truncate">
              Lorem ipsum dolor sit amet.
            </h5>
            <div className="flex items-center gap-2">
              <box-icon name="map" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                Nhà học C1,Đại học cần thơ{" "}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <box-icon name="time" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                {new Date(2312723423).toLocaleDateString()}
              </span>
            </div>
          </div>
        </li>
        <li className="mt-2 flex items-center px-2 py-1 bg-primary/20 rounded gap-2">
          <figure>
            <img
              className="flex-1 h-12 rounded object-cover"
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt=""
            />
          </figure>
          <div className="w-[80%]">
            <h5 className="text-lg font-bold truncate">
              Lorem ipsum dolor sit amet.
            </h5>
            <div className="flex items-center gap-2">
              <box-icon name="map" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                Nhà học C1,Đại học cần thơ{" "}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <box-icon name="time" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                {new Date(2312723423).toLocaleDateString()}
              </span>
            </div>
          </div>
        </li>
        <li className="mt-2 flex items-center px-2 py-1 bg-primary/20 rounded gap-2">
          <figure>
            <img
              className="flex-1 h-12 rounded object-cover"
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt=""
            />
          </figure>
          <div className="w-[80%]">
            <h5 className="text-lg font-bold truncate">
              Lorem ipsum dolor sit amet.
            </h5>
            <div className="flex items-center gap-2">
              <box-icon name="map" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                Nhà học C1,Đại học cần thơ{" "}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <box-icon name="time" color="#E5E7EB"></box-icon>
              <span className="text-sm text-gray-200">
                {new Date(2312723423).toLocaleDateString()}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RelatedPost;
