"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiHome } from "react-icons/ti";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-between h-screen p-3">
      <div className="space-y-2">
        <Link href="/">
          <FaXTwitter className="w-16 h-16 p-3 rounded-full cursor-pointer hover:bg-gray-100 hoverEffect" />
        </Link>
        <Link
          href="/"
          className="w-fit flex items-center p-3 hover:bg-gray-100 hoverEffect rounded-full gap-2"
        >
          <TiHome className="w-7 h-7" />
          <span className="font-semibold hidden xl:inline">Home</span>
        </Link>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-blue-400 rounded-full hover:brightness-95 w-48 h-9 text-white mt-4 hoverEffect shadow hidden xl:inline"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-400 rounded-full hover:brightness-95 w-48 h-9 text-white mt-4 hoverEffect shadow hidden xl:inline"
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className="text-gray-700 text-sm rounded-full p-3 hover:bg-gray-100 hoverEffect flex items-center">
          <img
            src={session.user?.image || ""}
            alt={session.user?.name || "user"}
            className="w-10 h-10 rounded-full xl:mr-2"
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session.user?.name}</h4>
            <p className="text-gray-500">@{session.user?.username}</p>
          </div>
          <HiDotsHorizontal className="h-5 hidden xl:inline xl:ml-5" />
        </div>
      )}
    </div>
  );
}
