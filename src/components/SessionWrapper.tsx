"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function SessionWrapper({ children }: Props) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
