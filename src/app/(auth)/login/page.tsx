"use client";

import Link from "next/link";
import Input from "@/_components/Input";
import { FormEvent, useState } from "react";
import Socials from "../_components/Socials";
import AuthWrapper from "../_components/AuthWrapper";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <AuthWrapper title="ورود به حساب کاربری">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="username"
          label="نام کاربری"
          placeholder="نام کاربری خود را وارد کنید"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          id="password"
          type="password"
          label="رمز عبور"
          placeholder="رمر عبور خود را وارد کنید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-2 block">
          <Link
            href={"/reset-password"}
            className="text-xs text-gray-400 dark:text-gray-600 hover:underline"
          >
            رمز عبور خود را فراموش کرده اید ؟
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-linear-to-r from-purple-800 to-purple-600 hover:shadow-[0_0_5px_#FFF] text-gray-200 rounded-md font-semibold focus:outline-none transition-all duration-300"
        >
          ورود
        </button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-600"></div>
        <p className="px-4 text-sm text-gray-400 dark:text-gray-900">ورود با</p>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      <Socials />

      <p className="text-center text-xs text-gray-400 mt-4 dark:text-gray-900">
        هنوز ثبت نام نکرده اید ؟
        <Link
          href={"/register"}
          className="text-indigo-400 dark:text-indigo-700 hover:underline mx-2"
        >
          ثبت نام
        </Link>
      </p>
    </AuthWrapper>
  );
}
