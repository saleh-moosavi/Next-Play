"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import AuthWrapper from "../_components/AuthWrapper";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <AuthWrapper title="بازنشانی رمز عبور">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm text-gray-400 dark:text-gray-900"
          >
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            placeholder="ایمیل خود را وارد کنید"
            className="w-full text-xs px-4 py-3 bg-gray-900 dark:bg-gray-300 dark:placeholder:text-gray-500 border border-transparent focus:border-orange-600 rounded-md text-gray-100 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-linear-to-r from-purple-800 to-purple-600 hover:shadow-[0_0_5px_#FFF] text-gray-200 rounded-md font-semibold focus:outline-none transition-all duration-300"
        >
          تایید
        </button>
      </form>

      <hr className="border-gray-400 mt-5" />

      <p className="text-center text-xs text-gray-400 mt-4">
        <Link
          href={"/login"}
          className="text-indigo-400 dark:text-indigo-700 hover:underline mx-2"
        >
          برگشت به صفحه ورود
        </Link>
      </p>
    </AuthWrapper>
  );
}
