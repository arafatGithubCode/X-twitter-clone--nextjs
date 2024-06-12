import Feed from "@/components/Feed";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="px-4 py-3 sticky top-0 z-50 border-b border-gray-200 bg-white">
        <h1 className="text-lg sm:text-xl font-bold">Home</h1>
      </div>
      <Input />
      <Feed />
    </div>
  );
}
