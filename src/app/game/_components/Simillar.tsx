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
        <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              بازی های مرتبط
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {similarGames.map((game, index) => {
                return (
                  <Link
                    key={"androidGames" + index}
                    href={`/game?slug=${game.url}`}
                    className="group shadow-md/20 shadow-white dark:shadow-black rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative aspect-2/3 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      <Image
                        src={game.imageUrl || "/alter-image.jpg"}
                        alt={game.title}
                        width={500}
                        height={500}
                        className="object-cover h-full w-full group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-2 text-center">
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
