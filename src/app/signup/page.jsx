"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  IconUserPlus,
  IconLogin2,
  IconHome,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);

      const postData = await axios.post("/api/users/signup", user);
      if (postData.data.error) {
        toast.error(postData.data.error);
        return;
      }

      toast.success(postData.data.message);
      toast.success("Please verify your email before logging in");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      user.username = "";
      user.email = "";
      user.password = "";
    }
  };

  const onHome = () => {
    try {
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-3xl">
      <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
            {loading ? "Processing.." : "Signup"}
          </span>
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center py-2 text-2xl gap-3">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>

        <div className="flex gap-2 mb-4 relative">
          <input
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
            type={isPasswordVisible ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="cursor-pointer absolute inset-y-0 left-[88%] right-0"
          >
            {isPasswordVisible ? (
              <IconEyeOff
                size={30}
                color="black"
                className="opacity-60 hover:opacity-100 transition duration-200"
              />
            ) : (
              <IconEye
                size={30}
                color="black"
                className="opacity-60 hover:opacity-100 transition duration-200"
              />
            )}
          </button>
        </div>
        <button
          type="button"
          className=" flex gap-2 items-center justify-center text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 mt-2 mb-10 dark:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none dark:focus:ring-purple-900 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          <IconUserPlus size={25} />
          Signup Now
        </button>
        <Link
          className="flex gap-2 items-center justify-center  text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 dark:bg-pink-700 mb-2 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full text-center"
          href="/login"
        >
          <IconLogin2 size={25} />
          Login
        </Link>
        <button
          type="button"
          className="text-white flex gap-2 items-center justify-center bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onHome}
        >
          <IconHome size={25} />
          Home
        </button>
      </div>
    </div>
  );
}
