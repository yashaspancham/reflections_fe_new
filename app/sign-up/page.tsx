"use client";
import React, { useState } from "react";
import AuthPagelayout from "@/components/AuthPageBorder";
import Link from "next/link";
import { validate } from "email-validator";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  function isGoodPassword(password: string): boolean {
    // Minimum 8 chars, at least one uppercase, lowercase, digit, and special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const handleSignUp = () => {
    if (!validate(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isGoodPassword(password)) {
      alert("Password does not meet the criteria.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Password"
          className="p-3 rounded bg-blue-200 focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 border border-gray-300"
        />
        {isFocused && (
          <div className="absolute max-xl:self-center rounded-sm p-2 top-0 text-md text-orange-600 bg-red-100">
            The password must have minimum 8 chars, at least one uppercase,
            lowercase, digit, and special character.
          </div>
        )}
        <div className="text-xl">Confirm Password</div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          className="p-3 rounded bg-blue-200 focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 border border-gray-300 "
        />
        <button
          onClick={handleSignUp}
          className="bg-blue-500 p-2 w-full rounded-lg text-md hover:bg-blue-600 hover:cursor-pointer text-white"
        >
          Enter
        </button>
        <p>
          regular? login{" "}
          <Link href="/sign-in" className="underline text-blue-500">
            here
          </Link>
        </p>
      </div>
    </AuthPagelayout>
  );
};

export default SignUpPage;
