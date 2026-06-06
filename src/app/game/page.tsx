// app/game/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameDataResponse } from "@/types/gamePageTypes";

// ==================== تابع دریافت داده در سرور ====================

async function fetchGameData(slug: string): Promise<GameDataResponse | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/game-data?url=${slug}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطا در fetchGameData:", error);
    return null;
  }
}

// ==================== متادیتا ====================

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "بازی | پارسی گیم",
      description: "مشاهده اطلاعات کامل بازی",
    };
  }

  const data = await fetchGameData(slug);

  if (!data?.success) {
    return {
      title: "بازی | پارسی گیم",
      description: "مشاهده اطلاعات کامل بازی",
    };
  }

  return {
    title: data.currentGame.title,
    description: data.currentGame.metaDescription,
    openGraph: {
      title: data.currentGame.title,
      description: data.currentGame.metaDescription,
      images: data.currentGame.imageUrl ? [data.currentGame.imageUrl] : [],
    },
  };
}

// ==================== کامپوننت اصلی ====================

interface GamePageProps {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const data = await fetchGameData(slug);

  if (!data?.success) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-6xl text-center">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-6 py-8 rounded-xl max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-lg mb-2">خطا در دریافت اطلاعات</p>
          <p className="text-sm">
            {data?.error || "متاسفانه اطلاعات این بازی در دسترس نیست"}
          </p>
        </div>
      </div>
    );
  }

  const { currentGame, similarGames, meta } = data;

  if (!currentGame) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* ==================== Header Section ==================== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="md:flex">
          {/* Game Poster */}
          <div className="md:w-1/3 lg:w-1/4 p-4 md:p-6">
            <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden shadow-md">
              {currentGame.imageUrl ? (
                <Image
                  src={currentGame.imageUrl}
                  alt={currentGame.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-16 h-16 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">بدون تصویر</span>
                </div>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="md:w-2/3 lg:w-3/4 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentGame.title}
            </h1>

            {/* Post Meta (تاریخ، دیدگاه، بازدید) */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              {currentGame.date && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {currentGame.date}
                </span>
              )}
              {currentGame.commentCount && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {currentGame.commentCount} دیدگاه
                </span>
              )}
              {currentGame.viewCount && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {currentGame.viewCount} بازدید
                </span>
              )}
            </div>

            {currentGame.metaDescription && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {currentGame.metaDescription}
              </p>
            )}

            {/* Rating */}
            {currentGame.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(currentGame.rating!)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {currentGame.rating} / 5
                </span>
              </div>
            )}

            {/* Meta Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentGame.metaInfo.size && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      حجم
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentGame.metaInfo.size}
                    </p>
                  </div>
                </div>
              )}
              {currentGame.metaInfo.lastUpdate && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      بروزرسانی
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentGame.metaInfo.lastUpdate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Persian Description ==================== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            توضیحات بازی
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {currentGame.fullDescription}
          </div>
        </div>
      </div>

      {/* ==================== English Description (About This Game) ==================== */}
      {currentGame.englishDescription && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About This Game
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentGame.englishDescription}
            </div>
          </div>
        </div>
      )}

      {/* ==================== System Requirements ==================== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 17h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7H5z"
              />
            </svg>
            سیستم مورد نیاز
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Minimum */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5">
              <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-3">
                حداقل سیستم مورد نیاز
              </h3>
              <ul className="space-y-2 text-sm">
                {currentGame.minOS.os && (
                  <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                    <span className="font-semibold">سیستم عامل:</span>
                    <span>{currentGame.minOS.os}</span>
                  </li>
                )}
                {currentGame.minOS.processor && (
                  <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                    <span className="font-semibold">پردازنده:</span>
                    <span className="text-left">
                      {currentGame.minOS.processor}
                    </span>
                  </li>
                )}
                {currentGame.minOS.memory && (
                  <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                    <span className="font-semibold">رم:</span>
                    <span>{currentGame.minOS.memory}</span>
                  </li>
                )}
                {currentGame.minOS.graphics && (
                  <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                    <span className="font-semibold">گرافیک:</span>
                    <span className="text-left">
                      {currentGame.minOS.graphics}
                    </span>
                  </li>
                )}
                {currentGame.minOS.directX && (
                  <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                    <span className="font-semibold">DirectX:</span>
                    <span>{currentGame.minOS.directX}</span>
                  </li>
                )}
                {currentGame.minOS.storage && (
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">فضای ذخیره‌سازی:</span>
                    <span>{currentGame.minOS.storage}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Recommended */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">
                سیستم پیشنهادی
              </h3>
              <ul className="space-y-2 text-sm">
                {currentGame.recommendOS.os && (
                  <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="font-semibold">سیستم عامل:</span>
                    <span>{currentGame.recommendOS.os}</span>
                  </li>
                )}
                {currentGame.recommendOS.processor && (
                  <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="font-semibold">پردازنده:</span>
                    <span className="text-left">
                      {currentGame.recommendOS.processor}
                    </span>
                  </li>
                )}
                {currentGame.recommendOS.memory && (
                  <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="font-semibold">رم:</span>
                    <span>{currentGame.recommendOS.memory}</span>
                  </li>
                )}
                {currentGame.recommendOS.graphics && (
                  <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="font-semibold">گرافیک:</span>
                    <span className="text-left">
                      {currentGame.recommendOS.graphics}
                    </span>
                  </li>
                )}
                {currentGame.recommendOS.directX && (
                  <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="font-semibold">DirectX:</span>
                    <span>{currentGame.recommendOS.directX}</span>
                  </li>
                )}
                {currentGame.recommendOS.storage && (
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">فضای ذخیره‌سازی:</span>
                    <span>{currentGame.recommendOS.storage}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Download Links ==================== */}
      {currentGame.downloadLinks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              لینک‌های دانلود
            </h2>
            <div className="grid gap-3">
              {currentGame.downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {link.text}
                      </p>
                      {link.size && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {link.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400">
                    دانلود
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== Similar Games ==================== */}
      {similarGames.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              بازی‌های مشابه
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarGames.map((game, index) => {
                // استخراج slug از URL
                let gameSlug = "";
                if (game.url) {
                  const match = game.url.match(/(\d+\/[^\/]+)/);
                  if (match) {
                    gameSlug = match[1];
                  }
                }
                return (
                  <Link
                    key={index}
                    href={`/game?slug=${encodeURIComponent(gameSlug)}`}
                    className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
                  >
                    <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      {game.imageUrl ? (
                        <Image
                          src={game.imageUrl}
                          alt={game.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 text-center group-hover:text-blue-600 transition-colors">
                        {game.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== Password Info ==================== */}
      {currentGame.metaInfo.password && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-r-4 border-yellow-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                رمز فایل
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 font-mono text-sm">
                {currentGame.metaInfo.password}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Breadcrumb ==================== */}
      {meta.categories.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>مسیر:</span>
            {meta.categories.map((category, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  {category}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
