import GameNews from "./GameNews";
import ArticleLeft from "./ArticleLeft";
import { ComingSoon, News } from "@/types/mainPageTypes";

export default function Articles({
  comingSoon,
  news,
}: {
  comingSoon: ComingSoon[];
  news: News[];
}) {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0">
      <h3 className="border-b-2 w-fit mx-auto border-white dark:border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
        جدیدترین مقالات
      </h3>
      <section className="grid sm:grid-cols-2 gap-5 mt-10">
        <GameNews news={news} />
        <article className="grid grid-rows-3 justify-center gap-5">
          {news.slice(0, 3).map((article: News) => (
            <ArticleLeft key={article.title} article={article} />
          ))}
        </article>
      </section>
    </div>
  );
}
