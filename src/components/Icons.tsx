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
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
interface IconsProps {
  id: string;
  uid: string;
}

const Icons: React.FC<IconsProps> = ({ id, uid }) => {
  const { data: session } = useSession() as { data: Session | null };
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  const handleLike = async () => {
    if (session) {
      const userId = session?.user?.uid;
      const username = session?.user?.username;

      if (userId && username) {
        if (isLiked) {
          deleteDoc(doc(db, "posts", id, "likes", userId));
        } else {
          await setDoc(doc(db, "posts", id, "likes", userId), {
            username,
            timestamp: serverTimestamp(),
          });
        }
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [id, db]);

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user?.uid === uid) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            toast.success("This post deleted successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            console.error(`Error removing post ${error}`);
          });
      } else {
        toast.error("You are not allowed to delete this post!");
      }
    }
  };
  return (
    <div className="flex items-center justify-start gap-5 text-gray-500 p-1">
      <div className="flex items-center gap-1">
        <HiOutlineChat
          onClick={() => {
            if (!session) {
              signIn();
            } else {
              setOpen(!open);
              setPostId(id);
            }
          }}
          className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-gray-100 hover:text-sky-500 hoverEffect"
        />
        {comments.length > 0 && <span>{comments.length}</span>}
      </div>
      <div className="flex items-center justify-center gap-1">
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

      {session?.user?.uid === uid && (
        <HiOutlineTrash
          onClick={handleDeletePost}
          className="w-8 h-8 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-500 hoverEffect"
        />
      )}
    </div>
  );
};

export default Icons;
