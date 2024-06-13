"use client";

import { db } from "@/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [id, db]);
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.data()}
            commentId={comment.id}
            originalPostId={id}
          />
        ))}
    </>
  );
};

export default Comments;
