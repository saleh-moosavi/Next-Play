import Link from "next/link";
import { SearchResponse } from "@/types/searchPageTypes";

export default function SearchPagePagination({
  text,
  results,
}: {
  text: string;
  results: SearchResponse;
}) {
  if (results.pagination.totalPages > 1)
    return (
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
    );
}
