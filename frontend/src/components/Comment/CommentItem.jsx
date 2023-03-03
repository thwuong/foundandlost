import React, { useState } from "react";
import CommentInput from "./CommentInput";

function CommentItem(props) {
  const { children } = props;
  const [showInput, setShowInput] = useState(false);
  return (
    <li className="flex gap-2 mt-4">
      <figure>
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/288626878_607825927378039_7742026331312148591_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=56cHRg2aK0cAX_U7Ydz&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBXErQLaP06PRD3bja8rTwV7BIJIApw6gkaoWXQZnsiYg&oe=64059601"
          alt=""
        />
      </figure>
      <div className="">
        <div className="p-2 rounded-2xl bg-white">
          <p className="font-medium">Phúc bùi</p>
          <span>
            Một bộ phim nhẹ nhàng nhưng vô cùng xúc động giá cái kết khác
          </span>
        </div>
        <div className="">
          <label
            onClick={() => {
              setShowInput(true);
            }}
            htmlFor="idInput"
            className="text-sm text-white cursor-pointer font-bold hover:underline"
          >
            Phản hồi
          </label>
          <span className="text-sm text-white ml-2">2 giờ</span>
        </div>
        {children}
        {showInput && <CommentInput idInput={"idInput"} />}
      </div>
    </li>
  );
}

export default CommentItem;
