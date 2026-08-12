import { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchItemCard from "./_components/SearchItemCard";
import SearchPagePagination from "./_components/SearchPagePagination";
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
    notFound();
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
            return <SearchItemCard key={"search item" + index} item={item} />;
          })}
        </div>

        <SearchPagePagination text={text} results={results} />
      </div>
    </div>
  );
}
