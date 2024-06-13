import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";
import { PostData } from "@/types/types";

interface PostProps {
  id: string;
  post: PostData;
}

const Post: React.FC<PostProps> = ({ id, post }) => {
  return (
    <div className="flex p-3 border-b border-gray-200">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src={post?.profileImg}
        alt="user-image"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-bold whitespace-nowrap truncate">
              {post?.name}
            </h4>
            <span className="text-xs whitespace-nowrap truncate">
              @{post?.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-xs" />
        </div>
        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 my-3 text-sm">{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          <img src={post?.image} className="rounded-2xl mr-2" />
        </Link>
        <Icons id={id} uid={post.uid} />
      </div>
    </div>
  );
};
export default Post;
