"use client";

import z from "zod";
import Link from "next/link";
import Input from "@/_components/Input";
import Button from "@/_components/Button";
import { setCookie } from "@/lib/cookies";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Socials from "../_components/Socials";
import AuthWrapper from "../_components/AuthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/schema";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = z.safeParse(registerSchema, data);
    if (result.success) {
      await setCookie(JSON.stringify(data), {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      router.refresh();
      return;
    }
  };

  return (
    <AuthWrapper title="ساخت حساب کاربری">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          id="email"
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          id="password"
          label="رمز عبور"
          placeholder="رمز عبور مورد نظر را وارد کنید"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          type="password"
          id="repassword"
          label="تکرار رمز عبور"
          placeholder="رمز عبور را مجدد وارد کنید"
          {...register("rePassword")}
          error={errors.rePassword?.message}
        />

        <Button
          type="submit"
          color="purple"
          rounded="md"
          width="full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
        </Button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-600"></div>
        <p className="px-4 text-sm text-gray-400 dark:text-gray-900">
          ثبت نام با
        </p>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      <Socials />

      <p className="text-center text-xs text-gray-400 mt-4 dark:text-gray-900">
        ثبت نام کرده اید ؟
        <Link
          href="/login"
          className="text-indigo-400 dark:text-indigo-700 hover:underline mx-2"
        >
          ورود
        </Link>
      </p>
    </AuthWrapper>
  );
}
