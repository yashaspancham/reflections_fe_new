"use client";

import React, { useState } from "react";
import AuthPagelayout from "@/components/AuthPageBorder";
import { useRouter } from "next/navigation";
import { validate } from "email-validator";
import Link from "next/link";
import { signin } from "@/APIs/auth/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignIn = () => {
    if (!validate(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password === "") {
      return;
    }
    signin(email, password).then((res) => {
      if (res!==null) {
        router.push("/entries");
      }
    });
  };
  return (
    <AuthPagelayout>
      <div className="sm:min-w-[400px] sm:min-h-[250px] flex flex-col gap-2">
        <div className="text-xl">Enter Email</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 rounded bg-blue-200 focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 border border-gray-300 "
        />
        <div className="text-xl">Enter Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded bg-blue-200 focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 border border-gray-300 "
        />
        <button
          onClick={handleSignIn}
          className="bg-blue-500 p-2 w-full rounded-lg text-md hover:bg-blue-600 hover:cursor-pointer text-white"
        >
          Enter
        </button>
        <p>
          New here? register{" "}
          <Link href="/sign-up" className="underline text-blue-500">
            here
          </Link>
        </p>
      </div>
    </AuthPagelayout>
  );
};

export default SignInPage;
