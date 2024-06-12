import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: "x-clone-next-926ca.firebaseapp.com",
  projectId: "x-clone-next-926ca",
  storageBucket: "x-clone-next-926ca.appspot.com",
  messagingSenderId: "16790317731",
  appId: "1:16790317731:web:5633d42f11abc20add6d16",
};

export const app = initializeApp(firebaseConfig);
