import Image from "next/image";
import { notFound } from "next/navigation";

async function getNews(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL!}/api/news?slug=${slug}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
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

  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        {news.coverImage && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              height={500}
              width={500}
              src={news.coverImage}
              alt={news.title}
              className="w-full h-full object-cover bg-gray-400"
            />
          </div>
        )}

        <h1 className="text-xl md:text-2xl text-justify font-bold mb-4">
          {news.title}
        </h1>

        <div className="flex items-center gap-4 text-sm">
          {news.authorAvatar && (
            <Image
              height={500}
              width={500}
              src={news.authorAvatar}
              alt={news.author}
              className="w-10 h-10 rounded-full bg-gray-400"
            />
          )}
          <div>
            <span className="font-medium">{news.author}</span>
            <div className="flex gap-2 mt-1">
              <span>{news.date}</span>-<span>{news.comments} دیدگاه</span>-
              <span>{news.views} بازدید</span>
            </div>
          </div>
        </div>
      </header>

      <div
        className="bg-gray-700 dark:bg-white rounded-xl shadow text-justify p-5 [&_img]:rounded-lg [&_img]:my-6 [&_blockquote]:opacity-60 [&_blockquote]:border-s [&_blockquote]:ps-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </article>
  );
}
