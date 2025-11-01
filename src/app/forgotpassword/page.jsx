"use client";

import {
  IconLockOpen,
  IconLogin2,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function forgotPassword() {
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [processing, setProcessing] = useState(false);
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(true);
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState("");
  const [isPasswordVisible2, setPasswordVisible2] = useState("");

  useEffect(() => {
    if (newPassword.length > 0 && confirmNewPassword.length > 0) {
      setAreFieldsEmpty(false);
    } else {
      setAreFieldsEmpty(true);
    }
  }, [newPassword, confirmNewPassword]);
  const onChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setNewPassword("");
      setConfirmNewPassword("");
      toast.error("Password does not match");
      return;
    }
    try {
      setProcessing(true);
      if (token.length == 0) {
        return toast.error("Invalid token");
      }
      const response = await axios.post("/api/users/forgotpassword", {
        token,
        newPassword,
      });
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

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-2xl gap-3 py-12 px-2">
      <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-700">
            {processing ? "Processing" : "Create New Password"}
          </span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-2 text-2xl gap-3">
        <label htmlFor="newPassword">New Password</label>

        <div className="flex gap-2 mb-4 relative">
          <input
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
            type={isPasswordVisible ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            id="newPassword"
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
        <label htmlFor="confirmNewPassword">Confirm New Password</label>

        <div className="flex gap-2 mb-4 relative">
          <input
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 bg-white placeholder-gray-400 text-black"
            type={isPasswordVisible2 ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New password"
            id="confirmNewPassword"
          />
          <button
            onClick={() => setPasswordVisible2(!isPasswordVisible2)}
            className="cursor-pointer absolute inset-y-0 left-[88%] right-0"
          >
            {isPasswordVisible2 ? (
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
        <div className="flex flex-col items-center justify-between py-2 text-2xl min-h-[calc(100vh-470px)]">
          <button
            type="button"
            className="flex gap-2 items-center justify-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-3 py-1.5 mt-4 mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 cursor-pointer w-full disabled:cursor-not-allowed disabled:opacity-50 transition duration-200"
            onClick={onChangePassword}
            disabled={areFieldsEmpty ? true : false}
          >
            <IconLockOpen size={25} />
            Change Password
          </button>
          <Link
            className="flex gap-2 items-center     justify-center text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg px-3 py-1.5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800 cursor-pointer w-full text-center transition duration-200"
            href="/login"
          >
            <IconLogin2 size={25} />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
