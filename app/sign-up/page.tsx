"use client";
import React, { useState } from "react";
import AuthPagelayout from "@/components/AuthPageBorder";
import Link from "next/link";
import { validate } from "email-validator";
import { toasting } from "@/utils/toast";
import { signup } from "@/APIs/auth/auth";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  function isGoodPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const handleSignUp = () => {
    if (disableButton) {
      return;
    }
    if (!validate(email)) {
      toasting("Please enter a valid email address.", "error");
      return;
    }
    if (!isGoodPassword(password)) {
      toasting("Password does not meet the criteria.", "error");
      return;
    }
    if (password !== confirmPassword) {
      toasting("Passwords do not match.", "error");
      return;
    }
    setDisableButton(true);
    signup(email, password).then((res) => {
      if (res) {
        router.push("/sign-in");
      }
      setDisableButton(false);
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
          className={`${disableButton? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} p-2 w-full rounded-lg text-md hover:cursor-pointer text-white`}
        >
          Enter
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="underline text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </AuthPagelayout>
  );
};

export default SignUpPage;
