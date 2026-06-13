import Image from "next/image";
import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function MetaInfo({ game }: { game: MobileCurrentGame }) {
  return (
    <section className="relative bg-gray-700 dark:bg-white rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl shrink-0">
        <Image
          src={game.imageUrl || "/alter-image.jpg"}
          alt={game.title}
          width={500}
          height={500}
          className="w-32 md:w-40 aspect-square rounded-xl object-cover"
        />
      </div>

      <article className="flex-1 text-center md:text-right">
        <h1 className="text-xl md:text-2xl font-bold mb-2">{game.title}</h1>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
          {game.isOffline && (
            <span className="px-3 py-1 bg-green-500/20 backdrop-blur rounded-full text-sm">
              آفلاین
            </span>
          )}
          {game.hasDataFile && (
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur rounded-full text-sm">
              دارای دیتا
            </span>
          )}
          <span className="px-3 py-1 bg-purple-500/20 backdrop-blur rounded-full text-sm">
            {game.mobileInfo.genre}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl *:space-y-2 *:**:first:font-semibold *:**:first:text-sm *:**:not-first:text-2xl *:**:not-first:font-bold">
          <div>
            <p>امتیاز</p>
            <p>{game.rating?.toFixed(1) || "?"}</p>
          </div>
          <div>
            <p>حجم</p>
            <p>{game.metaInfo.size || "?"}</p>
          </div>
          <div>
            <p>بازدید</p>
            <p>{game.viewCount || "?"}</p>
          </div>
          <div>
            <p>نسخه</p>
            <p>{game.mobileInfo.version}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
