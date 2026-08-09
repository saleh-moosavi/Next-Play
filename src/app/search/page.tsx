import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { SearchResponse, SearchResult } from "@/types/searchPageTypes";

async function getSearchResults(
  text: string,
  page: string = "1",
): Promise<SearchResponse | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?text=${encodeURIComponent(text)}&page=${page}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطا در getSearchResults:", error);
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ text?: string }> | { text?: string };
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const text = resolvedParams?.text;

  if (!text) {
    return {
      title: "جستجو | Next Play",
      description: "جستجوی بازی‌ها و اخبار در Next Play",
    };
  }

  return {
    title: `نتایج جستجو برای "${text}" | Next Play`,
    description: `نتایج جستجو برای ${text} در Next Play. جدیدترین بازی‌ها، اخبار و تریلرها.`,
    openGraph: {
      title: `نتایج جستجو برای "${text}"`,
      description: `نتایج جستجو برای ${text} در Next Play`,
      type: "website",
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams:
    | Promise<{ text?: string; page?: string }>
    | { text?: string; page?: string };
}) {
  const resolvedParams = await searchParams;
  const text = resolvedParams?.text;
  const page = resolvedParams?.page || "1";

  if (!text) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-4">
          <p className="text-gray-300 dark:text-gray-600">
            برای جستجو، از نوار جستجو در بالای صفحه استفاده کنید.
          </p>
        </div>
      </div>
    );
  }

  const results = await getSearchResults(text, page);

  if (!results || !results.success) {
    throw new Error("مشکلی در دریافت نتایج جستجو پیش آمده است");
  }

  if (results.data.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-4">
          <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-2">
            برای {text} نتیجه‌ای پیدا نشد.
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            پیشنهاد می‌کنیم از کلمات کلیدی دیگری استفاده کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white dark:text-gray-900">
            نتایج جستجو برای :
            <span className="text-purple-400 dark:text-purple-600">
              {" "}
              {text}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.data.map((item: SearchResult, index: number) => {
            const getTypeColor = (type: SearchResult["type"]) => {
              switch (type) {
                case "game":
                  return "bg-blue-500/20 text-blue-400";
                case "news":
                  return "bg-green-500/20 text-green-400";
                case "trailer":
                  return "bg-red-500/20 text-red-400";
                case "mobile":
                  return "bg-purple-500/20 text-purple-400";
                default:
                  return "bg-gray-500/20 text-gray-400";
              }
            };

            const getTypeText = (type: SearchResult["type"]) => {
              switch (type) {
                case "game":
                  return "بازی";
                case "news":
                  return "خبر";
                case "trailer":
                  return "تریلر";
                case "mobile":
                  return "موبایل";
                default:
                  return "متفرقه";
              }
            };

            return (
              <Link
                key={index}
                href={item.url || "#"}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-white/10"
              >
                <div className="relative aspect-video bg-gray-800/50 overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🎮
                    </div>
                  )}

                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(item.type)} backdrop-blur-sm`}
                  >
                    {getTypeText(item.type)}
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-bold text-white dark:text-gray-900 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h2>

                  {item.excerpt && (
                    <p className="text-gray-400 dark:text-gray-600 text-sm mt-2 line-clamp-2 text-justify">
                      {item.excerpt}
                    </p>
                  )}

                  {item.details && Object.keys(item.details).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.details.genre && (
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                          {item.details.genre}
                        </span>
                      )}
                      {item.details.size && (
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                          {item.details.size}
                        </span>
                      )}
                      {item.details.language && (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                          {item.details.language}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    {item.date && <span>views : {item.date}</span>}
                    {item.views && <span>views : {item.views}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {results.pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <Link
              href={`/search?text=${text}&page=${results.pagination.currentPage - 1}`}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                results.pagination.hasPreviousPage
                  ? "bg-purple-500/20 hover:bg-purple-500/30 text-white"
                  : "bg-gray-500/10 text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              قبلی
            </Link>

            <div className="flex gap-2">
              {Array.from(
                { length: Math.min(5, results.pagination.totalPages) },
                (_, i) => {
                  let pageNum = i + 1;
                  if (
                    results.pagination.currentPage > 3 &&
                    results.pagination.totalPages > 5
                  ) {
                    pageNum = results.pagination.totalPages - 4 + i;
                  }
                  if (
                    results.pagination.currentPage > 3 &&
                    results.pagination.currentPage <
                      results.pagination.totalPages - 2
                  ) {
                    pageNum = results.pagination.currentPage - 2 + i;
                  }

                  return (
                    <Link
                      key={pageNum}
                      href={`/search?text=${text}&page=${pageNum}`}
                      className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                        pageNum === results.pagination.currentPage
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                },
              )}
            </div>

            <Link
              href={`/search?text=${text}&page=${results.pagination.currentPage + 1}`}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                results.pagination.hasNextPage
                  ? "bg-purple-500/20 hover:bg-purple-500/30 text-white"
                  : "bg-gray-500/10 text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              بعدی
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
