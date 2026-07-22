"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] p-10 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-200 dark:via-gray-300 dark:to-gray-200 flex flex-col items-center justify-center text-center overflow-hidden rounded-xl">
      <p className="text-[150px] md:text-[200px] font-bold leading-none select-none bg-linear-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
        404
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-4">
        صفحه‌ای که به دنبالش هستید
        <span className="block text-purple-400 dark:text-purple-600">
          پیدا نشد!
        </span>
      </h2>

      <p className="text-gray-300 dark:text-gray-600 text-lg md:text-xl mb-5 max-w-lg">
        ممکن است آدرس صفحه تغییر کرده باشد یا صفحه حذف شده باشد. برای پیدا کردن
        مطلب مورد نظر خود از جستجو استفاده کنید.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-3 hover:gap-5 px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl text-white font-bold transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/25"
      >
        بازگشت به خانه
        <FaArrowLeft className="w-5 h-5" />
      </Link>
    </div>
  );
}
