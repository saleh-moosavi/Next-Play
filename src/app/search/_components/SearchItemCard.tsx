import Link from "next/link";
import Image from "next/image";
import { SearchResult } from "@/types/searchPageTypes";

export default function SearchItemCard({ item }: { item: SearchResult }) {
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
}
