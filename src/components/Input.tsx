"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function Input() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="flex space-x-3 w-full p-3 border-b border-gray-200">
      <img
        src={session.user?.image}
        alt="user-img"
        className="w-7 h-7 rounded-full cursor-pointer hover:brightness-95 hoverEffect"
      />
      <div className="divide-y-2 w-full divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          rows={2}
          placeholder="What's happening"
        ></textarea>
        <div className="flex items-center justify-between py-2.5">
          <HiOutlinePhotograph className="w-10 h-10 text-sky-500 hover:bg-sky-100 p-2 cursor-pointer  rounded-full hoverEffect" />
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full hover:brightness-95 hoverEffect disabled:opacity-45 font-bold shadow">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
