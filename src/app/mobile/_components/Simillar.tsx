import Link from "next/link";
import Image from "next/image";
import { MobileSimilarGame } from "@/types/mobileGameTypes";

export default function Simillar({
  similarGames,
}: {
  similarGames: MobileSimilarGame[];
}) {
  if (similarGames.length <= 0) return null;

  return (
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
  );
}
