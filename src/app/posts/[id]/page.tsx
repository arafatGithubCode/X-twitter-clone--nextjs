import Post from "@/components/Post";
import { db } from "../../../firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { PostData } from "@/types/types";
import Comments from "@/components/Comments";

interface Data {
  id?: string;
  uid?: string;
  image?: string;
  text?: string;
  name?: string;
  profileImg?: string;
  username?: string;
  timestamp?: Timestamp;
}
interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  let data: Data = {};
  const querySnapshot = await getDoc(doc(db, "posts", params.id));
  if (querySnapshot.exists()) {
    Object.assign(data, querySnapshot.data(), { id: querySnapshot.id });
  }

  const postData: PostData = {
    id: data.id || "",
    uid: data.uid || "",
    image: data.image || "",
    text: data.text || "",
    name: data.name || "",
    profileImg: data.profileImg || "",
    username: data.username || "",
    timestamp: data.timestamp || new Timestamp(0, 0),
  };

  return (
    <div className="max-w-xl mx-auto border-r border-l h-screen p-2">
      <div className="flex items-center space-x-1 px-3 py-1 border-b sticky top-0 z-50 bg-white/50">
        <Link
          href="/"
          className="hover:bg-gray-100 rounded-full hoverEffect p-2"
        >
          <HiArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="sm:text-lg">Home</h1>
      </div>
      <Post post={postData} id={postData.id} />
      <Comments id={params.id} />
    </div>
  );
}
