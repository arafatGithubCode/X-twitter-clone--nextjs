import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";

export default function Sidebar() {
  return (
    <div className="space-y-2 p-3">
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
      <button className="bg-blue-400 rounded-full hover:brightness-95 w-48 h-9 text-white mt-4 hoverEffect shadow hidden xl:inline">
        Sign In
      </button>
    </div>
  );
}
