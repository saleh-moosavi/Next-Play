import Image from "next/image";
import { FaDatabase } from "react-icons/fa";
import { CurrentGame } from "@/types/gamePageTypes";
import {
  HiCalendar,
  HiChat,
  HiEye,
  HiStar,
  HiOutlineStar,
  HiRefresh,
  HiPhotograph,
  HiSearch,
} from "react-icons/hi";

export default function MetaInfo({
  currentGame,
}: {
  currentGame: CurrentGame;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-gray-700 dark:bg-white text-white dark:text-black rounded-xl shadow-lg overflow-hidden p-5">
      <div className="col-span-1">
        <div className="relative md:aspect-2/3 w-full h-full bg-gray-600 dark:bg-gray-200 rounded-xl overflow-hidden">
          <Image
            src={currentGame.imageUrl || "/alter-image.jpg"}
            alt={currentGame.title}
            width={500}
            height={500}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{currentGame.title}</h1>

        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
          {currentGame.date && (
            <span className="flex items-center gap-1">
              <HiCalendar className="w-4 h-4" />
              {currentGame.date}
            </span>
          )}
          {currentGame.commentCount && (
            <span className="flex items-center gap-1">
              <HiChat className="w-4 h-4" />
              {currentGame.commentCount} دیدگاه
            </span>
          )}
          {currentGame.viewCount && (
            <span className="flex items-center gap-1">
              <HiEye className="w-4 h-4" />
              {currentGame.viewCount} بازدید
            </span>
          )}
        </div>

        {currentGame.metaDescription && (
          <p className="text-gray-400 text-sm leading-relaxed text-justify">
            {currentGame.metaDescription}
          </p>
        )}

        {currentGame.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(currentGame.rating!) ? (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                ) : (
                  <HiOutlineStar
                    key={i}
                    className="w-5 h-5 text-gray-300 dark:text-gray-600"
                  />
                ),
              )}
            </div>
            <span className="text-gray-400 text-sm">
              {currentGame.rating} / 5
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentGame.metaInfo.size && (
            <div className="flex items-center gap-2 p-2 bg-gray-600 dark:bg-gray-200 rounded-lg">
              <FaDatabase className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs">حجم</p>
                <p className="text-sm font-medium">
                  {currentGame.metaInfo.size}
                </p>
              </div>
            </div>
          )}
          {currentGame.metaInfo.lastUpdate && (
            <div className="flex items-center gap-2 p-2 bg-gray-600 dark:bg-gray-200 rounded-lg">
              <HiRefresh className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs">بروزرسانی</p>
                <p className="text-sm font-medium">
                  {currentGame.metaInfo.lastUpdate}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Image Gallery */}
        {currentGame.gameScreenshots &&
          currentGame.gameScreenshots.length > 0 && (
            <div className="mt-auto">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <HiPhotograph className="w-6 h-6 text-purple-500" />
                  تصاویری از محیط بازی
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {currentGame.gameScreenshots.map((screenshot, index) => (
                    <a
                      key={index}
                      href={screenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-video bg-gray-600 dark:bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <Image
                        src={screenshot || "/alter-image.jpg"}
                        alt={`${currentGame.title} - تصویر ${index + 1}`}
                        width={500}
                        height={500}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <HiSearch className="w-8 h-8 text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
