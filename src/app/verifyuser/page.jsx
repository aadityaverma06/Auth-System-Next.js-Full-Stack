"use client";

import { useRouter } from "next/navigation";
import React, { useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IconMailCheck } from "@tabler/icons-react";
export default function verifyUser() {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const onVerifyUser = async () => {
    try {
      setProcessing(true);
      const response = await axios.post("/api/users/verifyuser", { email });
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-12 px-2">
      <div className="mt-12 flex flex-col items-center justify-center py-2 text-2xl gap-3">
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center mb-16">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
              {processing
                ? "Processing.."
                : "Please enter your email to verify"}
            </span>
          </h1>
        </div>
        <hr />
        <label className="text-3xl" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="text-2xl flex gap-2 items-center justify-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 cursor-pointer w-max disabled:cursor-not-allowed disabled:opacity-50 transition duration-200"
        onClick={onVerifyUser}
      >
        <IconMailCheck size={25} />
        Verify
      </button>
    </div>
  );
}
