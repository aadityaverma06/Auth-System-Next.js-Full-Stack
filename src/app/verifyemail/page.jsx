"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      setVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-12">
      {verified && (
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
              Email Verified
            </span>
            <span className="ml-2 text-4xl">✅</span>
          </h1>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-3xl bg-red-500 text-black">Error</h2>
        </div>
      )}
      <Link
        className="flex justify-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 mt-4 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 cursor-pointer w-max text-3xl transition duration-200"
        href="/login"
      >
        <Image
          className="invert mr-2"
          src="/login.svg"
          alt="Login logomark"
          width={20}
          height={20}
        />
        Login
      </Link>
    </div>
  );
}
