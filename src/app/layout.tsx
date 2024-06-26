import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Created by Next.js 14",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-between max-w-6xl mx-auto">
            <div className="hidden sm:inline border-r h-screen sticky top-0">
              <Sidebar />
            </div>
            <div className="w-2xl flex-1">{children}</div>
            <div className="w-[24rem] border-l h-screen p-3 hidden lg:inline">
              <div className="sticky top-0 pt-5">
                <input
                  className="bg-gray-100 border border-gray-200 rounded-3xl text-sm px-3 py-1 w-full"
                  type="text"
                  placeholder="Search.."
                />
              </div>
              <News />
            </div>
          </div>
          <CommentModal />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </body>
      </html>
    </SessionWrapper>
  );
}
