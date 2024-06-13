"use client";

import { Session } from "next-auth";
import { db } from "../firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";

interface Comment {
  userImg?: string;
  username?: string;
  name?: string;
  comment?: string;
}

interface CommentProps {
  comment: Comment;
  commentId: string;
  originalPostId: string;
}

const Comment = ({ comment, commentId, originalPostId }: CommentProps) => {
  const { data: session } = useSession() as { data: Session | null };
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const handleLike = async () => {
    if (session) {
      const userId = session?.user?.uid;
      const username = session?.user?.username;

      if (userId && username) {
        if (isLiked) {
          deleteDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              userId
            )
          );
        } else {
          await setDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              userId
            ),
            {
              username,
              timestamp: serverTimestamp(),
            }
          );
        }
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  return (
    <>
      <div className="flex p-3 border-b border-gray-200 ml-9">
        <img
          className="w-8 h-8 rounded-full mr-4"
          src={comment?.userImg || ""}
          alt="user-image"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <h4 className="text-sm font-bold whitespace-nowrap truncate">
                {comment?.name}
              </h4>
              <span className="text-xs whitespace-nowrap truncate">
                @{comment?.username}
              </span>
            </div>
            <HiDotsHorizontal className="text-xs" />
          </div>

          <p className="text-gray-800 my-3 text-sm">{comment?.comment}</p>
          <div className="flex items-center gap-1">
            {isLiked ? (
              <HiHeart
                onClick={handleLike}
                className="w-8 h-8 p-2 rounded-full cursor-pointer text-red-500 hover:text-red-600 hoverEffect hover:bg-red-100"
              />
            ) : (
              <HiOutlineHeart
                onClick={handleLike}
                className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-500 hoverEffect"
              />
            )}
            {likes.length > 0 && (
              <span className={`text-sm ${likes && "text-red-500"}`}>
                {likes.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
