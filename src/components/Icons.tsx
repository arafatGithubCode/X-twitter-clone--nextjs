import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

const Icons = () => {
  return (
    <div className="flex items-center justify-start gap-5 text-gray-500 p-1">
      <HiOutlineChat className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-gray-100 hover:text-sky-500 hoverEffect" />
      <HiOutlineHeart className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-500 hoverEffect" />
      <HiOutlineTrash className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-500 hoverEffect" />
    </div>
  );
};

export default Icons;
