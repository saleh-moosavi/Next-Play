"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaExclamationTriangle, FaHome, FaRedo, FaBug } from "react-icons/fa";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] text-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-50 dark:to-gray-100 flex flex-col items-center justify-center gap-5 p-4 rounded-xl overflow-hidden">
      <div className="inline-block bg-linear-to-br from-red-500 to-orange-500 rounded-3xl p-6 shadow-2xl">
        <FaExclamationTriangle className="w-16 h-16 text-white" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-4">
        خطا در{" "}
        <span className="text-red-400 dark:text-red-600 inline-block">
          بارگذاری صفحه
        </span>
      </h2>

      {/* Error Details */}
      <div className="bg-white/5 dark:bg-gray-800/30 rounded-xl p-4 mb-6 border border-white/10 dark:border-gray-200/20 flex items-center gap-3 text-gray-300 dark:text-gray-600 text-sm">
        <FaBug className="w-5 h-5 text-orange-400" />
        <span>خطای غیرمنتظره‌ای رخ داده است. تیم ما در حال بررسی است.</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/25"
        >
          <FaRedo className="w-4 h-4" />
          تلاش مجدد
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-300/20 rounded-xl text-white dark:text-gray-900 font-medium hover:bg-white/20 transition-all"
        >
          <FaHome className="w-4 h-4" />
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
