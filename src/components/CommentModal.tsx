"use client";

import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <h3>comment modal</h3>
      {open && <h1>The modal is opened</h1>}
    </div>
  );
}
