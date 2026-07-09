import Link from "next/link";
import { notFound } from "next/navigation";
import { TrailerData } from "@/types/trailerTypes";

async function fetchTrailer(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/api/trailer?title=${slug}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.title) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("خطا در fetchTrailer:", error);
    return null;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }> | { slug?: string };
}) {
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const gameData: TrailerData = await fetchTrailer(slug);

  if (!gameData) {
    throw new Error("مشکلی در دریافت اطلاعات بازی پیش آمده است");
  }

  const videoSrc =
    gameData.qualities.q720 ||
    gameData.qualities.q360 ||
    gameData.qualities.q1080;

  return (
    <div className="rounded-xl overflow-hidden mx-5 xl:mx-auto">
      {videoSrc && (
        <video
          controls
          src={videoSrc}
          poster={gameData.mainUrl || undefined}
        ></video>
      )}
      <div className="mx-auto p-10 bg-gray-700 dark:bg-white">
        <div className="space-y-5">
          <h2 className="text-xl md:text-3xl font-bold text-center">
            {gameData.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 *:flex *:items-center *:justify-center *:gap-2 *:px-4 *:py-3 *:bg-blue-600 *:hover:bg-blue-700 *:text-white *:rounded-lg *:transition-colors">
            {gameData.qualities.q1080 && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={gameData.qualities.q1080}
              >
                دانلود 1080p
              </Link>
            )}

            {gameData.qualities.q720 && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={gameData.qualities.q720}
              >
                دانلود 720p
              </Link>
            )}

            {gameData.qualities.q360 && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={gameData.qualities.q360}
              >
                دانلود 360p
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
