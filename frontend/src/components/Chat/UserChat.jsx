import React from "react";

function UserList() {
  const active = true;
  return (
    <li
      className={`flex items-start gap-2 px-2 py-4 ${
        active ? "rounded-md bg-primary text-white" : "border-b"
      }`}
    >
      <figure>
        <img
          className="w-8 object-cover rounded-full"
          src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
          alt=""
        />
      </figure>
      <div>
        <p className="font-bold leading-3">Ricardo Lopez</p>
        <span className="text-s  text-gray-200">Sinh viên</span>
      </div>
      <p className="ml-auto text-s  text-gray-200">11:23 am</p>
    </li>
  );
}

export default UserList;
