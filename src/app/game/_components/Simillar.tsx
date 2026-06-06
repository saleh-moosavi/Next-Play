import Link from "next/link";
import Image from "next/image";
import { SimilarGame } from "@/types/gamePageTypes";

export default function Simillar({
  similarGames,
}: {
  similarGames: SimilarGame[];
}) {
  return (
    <>
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
                    <div className="relative aspect-2/3 bg-gray-200 dark:bg-gray-600 overflow-hidden">
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
    </>
  );
}
