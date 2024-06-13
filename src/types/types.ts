import { Timestamp } from "firebase/firestore";

export interface PostData {
  name: string;
  username: string;
  id: string;
  uid: string;
  profileImg: string;
  text: string;
  image: string;
  timestamp: Timestamp;
}
