import Link from "next/link";
import Image from "next/image";
import Button from "@/_components/Button";
import { AllTrailersResponse } from "@/types/trailerTypes";

async function getVideos(page: number): Promise<AllTrailersResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  try {
    const res = await fetch(`${baseUrl}/api/trailer/all?page=${page}`, {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      videos: [],
      hasMore: false,
      nextPage: null,
      currentPage: page,
    };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const data = await getVideos(currentPage);

  const { videos, hasMore, nextPage } = data;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPageNumber = hasMore ? nextPage : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {videos.length === 0 ? (
        <div className="text-center py-12 min-h-[80vh] flex justify-center items-center">
          <p className="text-3xl">هیچ ویدئویی یافت نشد</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            همه ی تریلر ها
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.map((video, index) => {
              const slug =
                video.slug || video.link.split("/").filter(Boolean).pop();

              return (
                <div
                  key={video.slug + index}
                  className="relative group w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-gray-800"
                >
                  <Image
                    width={500}
                    height={500}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:blur-sm transition-all duration-700 bg-gray-400"
                    src={video.imageUrl || "/alter-image.jpg"}
                    priority={index < 6}
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 p-2 flex flex-col justify-center items-center text-white text-center group-hover:bg-black/40 transition-all duration-700">
                    <Link
                      href={`/trailer?slug=${slug}`}
                      className="font-semibold line-clamp-2 px-2 hover:text-blue-400 transition-colors"
                    >
                      {video.title}
                    </Link>
                    <p className="text-xs mt-1 bg-black/50 px-2 py-1 rounded-full">
                      {video.duration}
                    </p>
                    {video.author && (
                      <p className="text-xs mt-1 opacity-70">{video.author}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {(prevPage || nextPageNumber) && (
            <div className="flex justify-center items-center gap-4 mt-8">
              {nextPageNumber && (
                <Link href={`?page=${nextPageNumber}`}>
                  <Button rounded="md" color="purple">
                    صفحه بعد
                  </Button>
                </Link>
              )}

              <Button rounded="md" color="gray">
                {`${currentPage}`}
              </Button>

              {prevPage && (
                <Link href={`?page=${prevPage}`}>
                  <Button rounded="md" color="purple">
                    صفحه قبلی
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
