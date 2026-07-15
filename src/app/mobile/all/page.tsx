import Link from "next/link";
import Image from "next/image";
import { AllMobileGamesResponse } from "@/types/mobileGameTypes";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

async function getGames(page: number): Promise<AllMobileGamesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  try {
    const res = await fetch(
      `${baseUrl}/api/mobile-game-data/all?page=${page}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch games: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    return {
      games: [],
      hasMore: false,
      nextPage: null,
      currentPage: page,
    };
  }
}

interface PageProps {
  searchParams: Promise<{ page?: string }> | { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const data = await getGames(currentPage);

  const { games, hasMore, nextPage } = data;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPageNumber = hasMore ? nextPage : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {games.length === 0 ? (
        <div className="text-center py-12 min-h-[80vh] flex justify-center items-center">
          <p className="text-3xl">هیچ بازی‌ ای یافت نشد</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            بازی‌های اندروید
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game, index) => {
              const gameSlug =
                game.slug || game.link.split("/").filter(Boolean).pop();

              return (
                <div
                  key={game.slug + index}
                  className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 dark:bg-black/10 hover:bg-purple-500/20 group text-white transition-all duration-700"
                >
                  <Image
                    width={500}
                    height={500}
                    alt={game.title}
                    className="w-full h-52 md:h-72 lg:h-52 object-cover bg-gray-400 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700"
                    src={game.iconUrl || "/alter-image.jpg"}
                  />
                  <p className="absolute top-2 right-2 flex items-center bg-black/60 px-2 py-[.1rem] text-xs font-semibold rounded-full select-none">
                    {game.date}
                  </p>
                  <div className="flex flex-col gap-2 items-center justify-center p-5 *:text-xs *:text-gray-400 *:dark:text-gray-700">
                    <Link
                      href={`/mobile?slug=${gameSlug}`}
                      className="text-xs font-semibold text-justify cursor-pointer dark:text-gray-900 hover:text-purple-400 transition-colors"
                    >
                      {game.title}
                    </Link>
                    {/* Star Section */}
                    <section className="flex items-center justify-center gap-2">
                      <span className="text-xs text-gray-500 ml-1 order-2">
                        ({game.ratingPercent}%)
                      </span>
                      <div className="flex items-center gap-1 flex-row-reverse order-1">
                        {[...Array(5)].map((_, index) => {
                          const starValue = (index + 1) * 20;
                          const remainder = game.ratingPercent - index * 20;

                          if (game.ratingPercent >= starValue) {
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
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {(prevPage || nextPageNumber) && (
            <div className="flex justify-center items-center gap-4 mt-8">
              {prevPage && (
                <Link
                  href={`?page=${prevPage}`}
                  className="text-sm px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  صفحه قبلی
                </Link>
              )}

              <span className="text-sm text-gray-600 px-4 py-2 bg-gray-100 rounded-lg">
                {currentPage}
              </span>

              {nextPageNumber && (
                <Link
                  href={`?page=${nextPageNumber}`}
                  className="text-sm px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  صفحه بعدی
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
