import Image from "next/image";
import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function MetaInfo({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="relative bg-linear-to-r from-purple-600 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
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
  );
}
