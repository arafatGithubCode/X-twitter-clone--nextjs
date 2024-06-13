"use client";

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Session } from "next-auth";

interface Post {
  profileImg?: string;
  text?: string;
  name?: string;
  username?: string;
}

export default function CommentModal() {
  const [open, setOpen] = useRecoilState<boolean>(modalState);
  const [postId, setPostId] = useRecoilState<string>(postIdState);
  const { data: session } = useSession() as { data: Session | null };
  const [post, setPost] = useState<Post | null>(null);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document");
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="w-[90%] max-w-lg border-2 border-gray-200 absolute top-24 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg"
        >
          <div className="p-4">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <HiX
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-700 p-1 hover:text-gray-600 hover:font-bold hoverEffect rounded-full cursor-pointer hover:scale-110 hover:bg-gray-100"
              />
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
              <img
                className="w-11 h-11 rounded-full mr-4 hover:brightness-95 cursor-pointer"
                src={post?.profileImg}
                alt="profile"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline truncate cursor-pointer">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">@{post?.username}</span>
            </div>
            <p className="ml-16 mb-2 text-gray-500 text-[15px] sm:text-[16px]">
              {post?.text}
            </p>
            <div className="p-3 space-x-3 flex">
              <img
                src={session?.user?.image || ""}
                alt="user-img"
                className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y-[1px] divide-gray-300">
                <div>
                  <textarea
                    rows={2}
                    value={input}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setInput(e.target.value)
                    }
                    className="outline-none text-gray-700 placeholder:text-gray-500 w-full tracking-wide min-h-[50px] p-2 focus-within:border focus-within:border-b-0"
                    placeholder="What's happening?"
                  ></textarea>
                </div>
                <div className="flex items-center justify-end pt-2.5">
                  <button
                    disabled={input.trim() === ""}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full disabled:opacity-50 hover:brightness-95 hoverEffect"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
