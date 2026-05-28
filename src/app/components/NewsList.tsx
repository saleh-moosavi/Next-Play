import NewsLeft from "./NewsLeft";
import NewsRight from "./NewsRight";
import { News, IranGameNews } from "@/types/mainPageTypes";

export default function NewsList({
  news,
  iranGamesNews,
}: {
  news: News[];
  iranGamesNews: IranGameNews[];
}) {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0">
      <h3 className="border-b-2 w-fit mx-auto border-white dark:border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
        اخبار بازی ها
      </h3>
      <section className="grid sm:grid-cols-2 gap-5 mt-10">
        <NewsRight news={news} />
        <NewsLeft news={iranGamesNews} />
      </section>
    </div>
  );
}
