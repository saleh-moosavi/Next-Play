import NewsLeft from "./NewsLeft";
import NewsRight from "./NewsRight";
import SectionTitle from "./SectionTitle";
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
      <SectionTitle title="اخبار بازی ها" />
      <section className="grid sm:grid-cols-2 gap-5 mt-10">
        <NewsRight news={news} />
        <NewsLeft news={iranGamesNews} />
      </section>
    </div>
  );
}
