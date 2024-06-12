"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app, db } from "../firebase";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Input() {
  const { data: session } = useSession();

  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [progressbar, setProgressbar] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage(selectedFile);
    }
  }, [selectedFile]);

  const uploadImageToStorage = (file: File) => {
    setIsImageUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, `post-images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapShort) => {
        const progress =
          (snapShort.bytesTransferred / snapShort.totalBytes) * 100;
        setProgressbar(`Uploading ${progress.toFixed(0)} % done`);
      },
      (error) => {
        console.log(error);
        setIsImageUploading(false);
        setSelectedFile(null);
        setImageFileUrl(null);
        setProgressbar("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setIsImageUploading(false);
          setProgressbar("");
        });
      }
    );
  };

  const handlePost = async () => {
    setIsPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session?.user?.uid,
      username: session?.user?.username,
      name: session?.user?.name,
      text,
      profileImg: session?.user?.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    });
    setIsPostLoading(false);
    setIsImageUploading(false);
    setText("");
    setSelectedFile(null);
    setImageFileUrl(null);
  };

  if (!session) return null;

  return (
    <div className="flex space-x-3 w-full p-3 border-b border-gray-200 relative">
      <img
        src={session.user?.image || ""}
        alt="user-img"
        className="w-7 h-7 rounded-full cursor-pointer hover:brightness-95 hoverEffect"
      />

      <div className="divide-y-2 w-full divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          rows={2}
          placeholder="What's happening"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {selectedFile && (
          <div className="relative">
            <img
              onClick={() => imagePickerRef.current?.click()}
              src={imageFileUrl || ""}
              alt="post-img"
              className={`w-full max-h-[250px] object-cover cursor-pointer ${
                isImageUploading ? "animate-pulse" : ""
              }`}
            />
            {progressbar && (
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 px-3 py-1 rounded-full font-semibold">
                {progressbar}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between py-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePickerRef.current?.click()}
            className="w-10 h-10 text-sky-500 hover:bg-sky-100 p-2 cursor-pointer  rounded-full hoverEffect"
          />
          <input
            type="file"
            ref={imagePickerRef}
            onChange={(e) => addImageToPost(e)}
            accept="image/*"
            className="hidden"
          />
          <button
            disabled={text.trim() === "" || isPostLoading || isImageUploading}
            onClick={handlePost}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full hover:brightness-95 hoverEffect disabled:opacity-45 font-bold shadow disabled:cursor-none"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
