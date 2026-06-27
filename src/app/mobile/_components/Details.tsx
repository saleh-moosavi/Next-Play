import Link from "next/link";
import Image from "next/image";
import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function Details({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden p-5 space-y-5">
      <h2 className="text-xl font-bold flex items-center gap-2">
        اطلاعات بازی
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . سازنده
            </div>
            <div className="font-bold px-4">
              {game.mobileInfo.developer || "نامشخص"}
            </div>
          </div>
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . سبک
            </div>
            <div className="font-bold px-4">
              {game.mobileInfo.genre || "نامشخص"}
            </div>
          </div>
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . سیستم عامل
            </div>
            <div className="font-bold px-4">
              {game.mobileInfo.os || "نامشخص"}
            </div>
          </div>
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . حداقل نسخه اندروید
            </div>
            <div className="font-bold px-4">{game.minOS || "نامشخص"}</div>
          </div>
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . رده سنی
            </div>
            <div className="font-bold px-4">
              {game.mobileInfo.ageRating || "نامشخص"}
            </div>
          </div>
          <div className="space-y-2 rounded-lg">
            <div className="text-sm font-bold text-gray-300 dark:text-gray-400">
              . قیمت
            </div>
            <div className="font-bold px-4">
              {game.mobileInfo.price || "نامشخص"}
            </div>
          </div>
        </div>

        {game.fullDescription && (
          <div>
            <h3 className="text-xl font-bold mb-3">توضیحات</h3>
            <div className="rounded-lg">
              {game.fullDescription.split("\n").map(
                (paragraph, idx) =>
                  paragraph.trim() && (
                    <p key={idx} className="mb-5 text-justify">
                      {paragraph}
                    </p>
                  ),
              )}
            </div>
          </div>
        )}

        {game.gameScreenshots.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3">تصاویر بازی</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {game.gameScreenshots.map((screenshot, idx) => (
                <Link
                  key={idx}
                  href={screenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-lg"
                >
                  <Image
                    src={screenshot || "/alter-image.jpg"}
                    alt={`${game.title} - تصویر ${idx + 1}`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-lg bg-gray-400 group-hover:scale-105 transition-all duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
