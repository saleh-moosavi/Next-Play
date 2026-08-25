"use client";

import Link from "next/link";
import Input from "@/_components/Input";
import Button from "@/_components/Button";
import { FormEvent, useState } from "react";
import Socials from "../_components/Socials";
import AuthWrapper from "../_components/AuthWrapper";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <AuthWrapper title="ساخت حساب کاربری">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="رمز عبور"
          placeholder="رمر عبور مورد نظر را وارد کنید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          id="repassword"
          label="تکرار رمز عبور"
          placeholder="رمر عبور را مجدد وارد کنید"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <Button type="submit" color="purple" rounded="md" width="full">
          ثبت نام
        </Button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-600"></div>
        <p className="px-4 text-sm text-gray-400 dark:text-gray-900">
          ثبت نام با{" "}
        </p>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      <Socials />

      <p className="text-center text-xs text-gray-400 mt-4 dark:text-gray-900">
        ثبت نام کرده اید ؟
        <Link
          href={"/login"}
          className="text-indigo-400 dark:text-indigo-700 hover:underline mx-2"
        >
          ورود
        </Link>
      </p>
    </AuthWrapper>
  );
}
