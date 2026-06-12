// components/MobileGameDetail.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MobileCurrentGame,
  MobileSimilarGame,
  MobileMetaData,
} from "@/types/mobileGameTypes";

interface MobileGameDetailProps {
  currentGame: MobileCurrentGame;
  similarGames: MobileSimilarGame[];
  meta: MobileMetaData;
}

export default function MobileGameDetail({
  currentGame: game,
  similarGames,
  meta,
}: MobileGameDetailProps) {
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [selectedTab, setSelectedTab] = useState<"download" | "info" | "guide">(
    "download",
  );
  const [copied, setCopied] = useState(false);

  const copyPassword = () => {
    if (game.metaInfo.password) {
      navigator.clipboard.writeText(game.metaInfo.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* هدر با تصویر پس‌زمینه */}
      <div className="relative bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* تصویر بازی */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl shrink-0">
              {game.imageUrl ? (
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl">🎮</span>
                </div>
              )}
            </div>

            {/* اطلاعات اصلی */}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {game.title}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {game.isOffline && (
                  <span className="px-3 py-1 bg-green-500/20 backdrop-blur rounded-full text-sm">
                    🎮 آفلاین
                  </span>
                )}
                {game.hasDataFile && (
                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur rounded-full text-sm">
                    📦 دارای دیتا
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-500/20 backdrop-blur rounded-full text-sm">
                  {game.mobileInfo.genre}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                <div>
                  <div className="text-2xl font-bold">
                    {game.rating?.toFixed(1) || "?"}
                  </div>
                  <div className="text-sm opacity-90">⭐ امتیاز</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {game.metaInfo.size || "?"}
                  </div>
                  <div className="text-sm opacity-90">📦 حجم</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {game.viewCount || "?"}
                  </div>
                  <div className="text-sm opacity-90">👁️ بازدید</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {game.mobileInfo.version}
                  </div>
                  <div className="text-sm opacity-90">📱 نسخه</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* تب‌ها */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setSelectedTab("download")}
              className={`flex-1 px-4 py-4 font-bold transition-all whitespace-nowrap ${
                selectedTab === "download"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📥 لینک‌های دانلود
            </button>
            <button
              onClick={() => setSelectedTab("info")}
              className={`flex-1 px-4 py-4 font-bold transition-all whitespace-nowrap ${
                selectedTab === "info"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ℹ️ اطلاعات بازی
            </button>
            <button
              onClick={() => setSelectedTab("guide")}
              className={`flex-1 px-4 py-4 font-bold transition-all whitespace-nowrap ${
                selectedTab === "guide"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📖 راهنمای نصب
            </button>
          </div>

          <div className="p-6">
            {/* تب دانلود */}
            {selectedTab === "download" && (
              <div>
                {/* انتخاب نسخه */}
                {game.downloadLinks.length > 1 && (
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {game.downloadLinks.map((version, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVersion(idx)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                          selectedVersion === idx
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {version.title}
                        <span className="block text-xs opacity-75">
                          {version.size}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* لینک‌های دانلود */}
                <div className="space-y-3">
                  {game.downloadLinks[selectedVersion]?.links.map(
                    (link, idx) => (
                      <div key={idx}>
                        {!link.url && link.text && (
                          <div className="font-bold text-gray-700 mt-4 mb-2 text-lg">
                            {link.text}
                          </div>
                        )}
                        {link.url && (
                          <a
                            href={link.url}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-all group border border-transparent hover:border-green-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📎</span>
                              <div>
                                <div className="font-medium text-gray-800 group-hover:text-green-600">
                                  {link.text}
                                </div>
                                {link.size && (
                                  <div className="text-sm text-gray-500">
                                    حجم: {link.size}
                                  </div>
                                )}
                              </div>
                            </div>
                            {link.serverLocation && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  link.serverLocation === "ایران"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {link.serverLocation === "ایران"
                                  ? "🇮🇷 سرور ایران"
                                  : "🌍 سرور خارج"}
                              </span>
                            )}
                          </a>
                        )}
                      </div>
                    ),
                  )}
                </div>

                {/* رمز فایل */}
                {game.metaInfo.password && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <div className="font-bold text-yellow-800">
                          🔐 رمز فایل:
                        </div>
                        <code className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded mt-1 inline-block font-mono">
                          {game.metaInfo.password}
                        </code>
                      </div>
                      <button
                        onClick={copyPassword}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all text-sm"
                      >
                        {copied ? "✓ کپی شد" : "📋 کپی رمز"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* تب اطلاعات بازی */}
            {selectedTab === "info" && (
              <div className="space-y-6">
                {/* جدول اطلاعات */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">👨‍💻 سازنده</div>
                    <div className="font-medium">
                      {game.mobileInfo.developer}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">🎮 سبک</div>
                    <div className="font-medium">{game.mobileInfo.genre}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">📱 سیستم عامل</div>
                    <div className="font-medium">{game.mobileInfo.os}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">
                      🤖 حداقل نسخه اندروید
                    </div>
                    <div className="font-medium">{game.minOS}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">🔞 رده سنی</div>
                    <div className="font-medium">
                      {game.mobileInfo.ageRating}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">💰 قیمت</div>
                    <div className="font-medium">{game.mobileInfo.price}</div>
                  </div>
                </div>

                {/* توضیحات */}
                {game.fullDescription && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">📝 توضیحات بازی</h3>
                    <div className="prose prose-sm max-w-none bg-gray-50 p-6 rounded-lg">
                      {game.fullDescription.split("\n").map(
                        (paragraph, idx) =>
                          paragraph.trim() && (
                            <p key={idx} className="mb-2">
                              {paragraph}
                            </p>
                          ),
                      )}
                    </div>
                  </div>
                )}

                {/* اسکرین شات‌ها */}
                {game.gameScreenshots.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">📸 تصاویر بازی</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {game.gameScreenshots.map((screenshot, idx) => (
                        <a
                          key={idx}
                          href={screenshot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group"
                        >
                          <Image
                            src={screenshot}
                            alt={`${game.title} - تصویر ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white text-2xl">
                              🔍
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* تب راهنمای نصب */}
            {selectedTab === "guide" && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">
                  📖 راهنمای نصب بازی
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-bold text-lg mb-2">نصب فایل APK:</h4>
                    <ol className="list-decimal list-inside space-y-1 mr-4">
                      <li>فایل APK بازی را دانلود کنید.</li>
                      <li>روی فایل دانلود شده کلیک کنید.</li>
                      <li>
                        اگر گوشی شما نصب از منابع ناشناس را غیرفعال کرده، اجازه
                        دهید.
                      </li>
                      <li>روی گزینه نصب کلیک کنید.</li>
                      <li>پس از اتمام نصب، بازی را اجرا کنید.</li>
                    </ol>
                  </div>

                  {game.hasDataFile && (
                    <div>
                      <h4 className="font-bold text-lg mb-2">نصب فایل دیتا:</h4>
                      <ol className="list-decimal list-inside space-y-1 mr-4">
                        <li>
                          فایل APK را نصب کنید اما{" "}
                          <strong className="text-red-600">اجرا نکنید</strong>.
                        </li>
                        <li>فایل دیتا (ZIP یا RAR) را دانلود کنید.</li>
                        <li>
                          با نرم‌افزارهایی مثل WinRAR یا ZArchiver فایل را
                          اکسترکت کنید.
                        </li>
                        <li>
                          پوشه به دست آمده را به مسیر{" "}
                          <code className="bg-gray-200 px-1 rounded">
                            Android/obb/
                          </code>{" "}
                          منتقل کنید.
                        </li>
                        <li>حالا بازی را اجرا کنید.</li>
                      </ol>
                    </div>
                  )}

                  {game.metaInfo.password && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                      <p className="font-bold">🔐 رمز فایل‌های فشرده:</p>
                      <code className="text-yellow-800">
                        {game.metaInfo.password}
                      </code>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="font-bold">💡 نکات مهم:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        حتماً از نرم‌افزار مدیریت دانلود مثل IDM استفاده کنید.
                      </li>
                      <li>
                        در صورت مشکل در دانلود، از VPN یا DNS تغییر استفاده
                        کنید.
                      </li>
                      <li>
                        تمام فایل‌های دانلودی در سرورهای ایران هستند و ترافیک
                        نیم‌بها محاسبه می‌شود.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* بازی‌های مشابه */}
        {similarGames.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎮</span> بازی‌های مشابه
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarGames.map((similarGame, idx) => (
                <Link
                  key={idx}
                  href={`/mobile?slug=${similarGame.url}`}
                  className="group text-center hover:shadow-md transition-all rounded-lg p-3 bg-gray-50 hover:bg-white"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 mb-2">
                    {similarGame.imageUrl ? (
                      <Image
                        src={similarGame.imageUrl}
                        alt={similarGame.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🎮
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-green-600">
                    {similarGame.title}
                  </h3>
                  {similarGame.rating && (
                    <div className="text-xs text-yellow-500 mt-1">
                      ★ {similarGame.rating.toFixed(1)}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
