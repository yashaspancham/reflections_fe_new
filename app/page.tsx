"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <p className="text-4xl">Welcome to Reflections</p>
        <button 
        onClick={()=>router.push("/sign-in")}
        className="bg-blue-500 p-2 w-40 rounded-lg text-md hover:bg-blue-600 hover:cursor-pointer text-white">
          Sign in
        </button>
      </div>
    </main>
  );
}
