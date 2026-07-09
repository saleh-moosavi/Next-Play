import Link from "next/link";
import Image from "next/image";
import { MobileSimilarGame } from "@/types/mobileGameTypes";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Simillar({
  similarGames,
}: {
  similarGames: MobileSimilarGame[];
}) {
  if (similarGames.length <= 0) return null;

  return (
    <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg p-6 space-y-5">
      <h2 className="text-xl font-bold">بازی‌های مشابه</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarGames.map((game, index) => (
          <Link
            key={index}
            href={`/mobile?slug=${game.url}`}
            className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-800 dark:bg-gray-100 group transition-all duration-700"
          >
            <Image
              width={500}
              height={500}
              alt={game.title}
              className="w-full h-52 md:h-72 lg:h-52 object-cover bg-gray-400 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700"
              src={game.imageUrl || "/alter-image.jpg"}
            />
            {game.downloadCount && (
              <p className="absolute top-2 right-2 flex items-center bg-black/60 px-2 py-[.1rem] text-xs font-semibold rounded-full select-none">
                {game.downloadCount}
              </p>
            )}
            <div className="flex flex-col gap-2 items-center justify-center p-5 *:text-xs">
              <p className="text-sm font-semibold text-justify cursor-pointer">
                {game.title}
              </p>
              {/* Star Section */}
              <section className="flex items-center justify-center gap-2">
                <span className="text-xs ml-1 order-2">({game.rating}%)</span>
                <div className="flex items-center gap-1 flex-row-reverse order-1">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    const remainder = (game.rating || 0) - index;

                    if (game.rating && game.rating >= starValue) {
                      return (
                        <FaStar
                          key={index}
                          className="w-4 h-4 text-yellow-400"
                        />
                      );
                    } else if (remainder > 0 && remainder < 20) {
                      return (
                        <FaStarHalfAlt
                          key={index}
                          className="w-4 h-4 text-yellow-400"
                        />
                      );
                    } else {
                      return (
                        <FaRegStar
                          key={index}
                          className="w-4 h-4 text-gray-400 dark:text-gray-600"
                        />
                      );
                    }
                  })}
                </div>
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
