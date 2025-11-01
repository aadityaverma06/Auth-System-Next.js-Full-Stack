"use client";
"use client";
import {
  IconLogout2,
  IconUser
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import toast from "react-hot-toast";

function Profile({ params }) {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { id } = use(params);
  const onLogout = async () => {
    try {
      setButtonDisabled(true);
      const response = await axios.get("/api/users/logout");
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setButtonDisabled(false);
    }
  };

  const goToProfilePage = async () => {
    router.push("/profile");
  };
  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen py-2 px-2">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl mb-2">
        Profile of
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700 ml-5">
          {id}
        </span>
      </h1>
      <hr />
      <Image
        src="/profile.jpg"
        alt="Profile Background"
        height={1250}
        width={625}
        className="border border-solid border-black dark:border-white rounded-lg"
      ></Image>
      <div className="flex flex-col items-center gap-6 mt-2">
        <button
          type="button"
          className="text-white text-2xl bg-purple-600 hover:bg-purple-700 focus:ring-4 flex gap-2 items-center justify-center focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 dark:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none dark:focus:ring-purple-900 cursor-pointer w-full
        disabled:cursor-not-allowed disabled:opacity-50 transition duration-200"
          onClick={onLogout}
          disabled={buttonDisabled}
        >
          <IconLogout2 size={25} />
          Logout
        </button>
        <button
          type="button"
          className=" flex gap-2 items-center justify-centertext-white text-2xl bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 dark:bg-pink-700 dark:hover:bg-pink-800 focus:outline-none dark:focus:ring-pink-900 cursor-pointer w-full
        disabled:cursor-not-allowed disabled:opacity-50 transition duration-200"
          onClick={goToProfilePage}
        >
          <IconUser size={25} />
          Profile Page
        </button>
      </div>
    </div>
  );
}

export default Profile;
