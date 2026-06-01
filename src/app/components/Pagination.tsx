import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const generatePagination = () => {
    const pages: (number | string)[] = [];
    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 4) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 5);
    }

    if (currentPage >= totalPages - 3) {
      startPage = Math.max(2, totalPages - 4);
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePagination();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-2 py-2 text-gray-400 dark:text-gray-500"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-orange-500 text-white cursor-default"
                : "bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 hover:bg-orange-500 dark:hover:bg-orange-500"
            }`}
          >
            {page}
          </Link>
        ),
      )}
    </div>
  );
}
