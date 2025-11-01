"use client";
import {
  IconLogout2,
  IconUser
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("No Username");
  const [fetchUserData, setFetchUserData] = useState("Get User Data");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateTheme();

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      setFetchUserData("Profile Page");
      toast.success(response.data.message);
      setUsername(response.data.user.username);
    } catch (error) {
      console.log(error);
    }
  };
  const goToProfilePage = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen pb-10 pt-20">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        {username === "No Username" ? (
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
            No Username
          </span>
        ) : (
          <Link
            href={`/profile/${username}`}
            className="text-transparent bg-clip-text px-3 bg-gradient-to-r to-pink-500 from-purple-700 relative transition duration-200"
          >
            <div className="absolute top-1 w-full h-full -z-10 bg-gray-200 dark:bg-gray-800 opacity-90 rounded-lg "></div>
            {username}
          </Link>
        )}
      </h1>
      <hr />
      <Image
        src={
          theme === "light"
            ? "/commonprofilelight.jpg"
            : "/commonprofiledark.png"
        }
        alt="Profile Background"
        height={800}
        width={400}
        className="rounded-lg mb-4 mt-4"
      ></Image>
      <div className="flex flex-col items-center gap-6 ">
        <button
          type="button"
          className="flex gap-2 items-center justify-center text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 dark:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none dark:focus:ring-purple-900 cursor-pointer w-full text-2xl transition duration-200"
          onClick={onLogout}
        >
          <IconLogout2 size={25} />
          Logout
        </button>
        <button
          type="button"
          className="flex gap-2 items-center justify-center text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 pink:bg-blue-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800 cursor-pointer w-max text-2xl transition duration-200"
          onClick={
            fetchUserData === "Get User Data" ? getUserData : goToProfilePage
          }
        >
          <IconUser size={25} />
          {fetchUserData}
        </button>
      </div>
    </div>
  );
}

export default Profile;
