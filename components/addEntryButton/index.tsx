"use client";

import { useRouter } from "next/navigation";

const AddEntryButton = () => {
    const router=useRouter();
  return (
    <button
      onClick={() => router.push("/entry")}
      className="z-10 fixed right-5 lg:right-20 bottom-36 sm:bottom-24 lg:bottom-10 bg-blue-800 py-1 px-2 lg:px-3 lg:py-2 rounded-xl hover:cursor-pointer hover:bg-blue-700"
    >
      <p className="text-white text-5xl">+</p>
    </button>
  );
};

export default AddEntryButton;