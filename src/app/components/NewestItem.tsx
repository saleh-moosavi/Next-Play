import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { Game } from "@/types/mainPageTypes";

export default function NewestItem({ game }: { game: Game }) {
  return (
    <div className="flex flex-col gap-2 group relative rounded-2xl overflow-hidden bg-gray-700 dark:bg-gray-300 shadow-lg">
      <div className="relative overflow-hidden h-52">
        <Image
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-linear-0 from-gray-500 to-gray-600"
          src={game.thumbnail}
          alt={game.title}
        />
        {game.updateBadge && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {game.updateBadge}
          </span>
        )}
      </div>

      <section className="flex flex-col gap-2 p-2">
        <Link
          href={game.link}
          className="text-sm min-h-10 text-white text-justify dark:text-gray-900 font-semibold sm:text-right cursor-pointer hover:text-orange-400 dark:hover:text-orange-600 transition-colors line-clamp-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {game.title}
        </Link>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-300 dark:text-gray-600">
            <FaUser className="w-3 h-3" />
            <span>{game.date.replace("پارسی گیم", "")}</span>
          </div>
        </div>

        {Object.keys(game.details).length > 0 && (
          <div className="mt-3 flex flex-col gap-1">
            {Object.entries(game.details)
              .slice(0, 2)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs bg-black/20 dark:bg-white/20 px-2 py-1 rounded-md w-fit"
                >
                  {key}: {value}
                </span>
              ))}
          </div>
        )}

        {game.description && (
          <p className="text-xs text-justify text-gray-300 dark:text-gray-600 mt-2">
            {game.description}
          </p>
        )}
      </section>
      {game.link && (
        <Link
          href={game.link}
          className="mt-auto justify-self-end text-xs font-semibold bg-orange-600/60 text-orange-300 dark:bg-orange-600/70 dark:text-orange-200 hover:bg-orange-600/80 py-2 flex items-center gap-x-2 justify-center transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          مشاهده جزئیات
        </Link>
      )}
    </div>
  );
}
