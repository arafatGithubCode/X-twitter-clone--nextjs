"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "../firebase";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Input() {
  const { data: session } = useSession();

  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

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
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapShort) => {
        const progress =
          (snapShort.bytesTransferred / snapShort.totalBytes) * 100;
        console.log(`uploading ${progress} $ done`);
      },
      (error) => {
        console.log(error);
        setIsImageUploading(false);
        setSelectedFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setIsImageUploading(false);
        });
      }
    );
  };

  if (!session) return null;

  return (
    <div className="flex space-x-3 w-full p-3 border-b border-gray-200">
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
        ></textarea>
        {selectedFile && (
          <img
            onClick={() => imagePickerRef.current?.click()}
            src={imageFileUrl || ""}
            alt="post-img"
            className="w-full max-h-[250px] object-cover cursor-pointer"
          />
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
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full hover:brightness-95 hoverEffect disabled:opacity-45 font-bold shadow">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
