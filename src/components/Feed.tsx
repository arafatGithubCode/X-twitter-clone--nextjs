import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { app, db } from "../firebase";
import Post from "./Post";

interface PostData {
  name: string;
  username: string;
  id: string;
  uid: string;
  profileImg: string;
  timestamp: Timestamp;
  text: string;
  image: string;
}

export default async function Feed() {
  const queryData = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc")
  );
  const querySnapShort = await getDocs(queryData);
  const data: PostData[] = [];
  querySnapShort.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as PostData);
  });

  return (
    <div>
      {data &&
        data.map((post) => <Post key={post.id} id={post.id} post={post} />)}
    </div>
  );
}
