import ArticleLeft from "./ArticleLeft";
import ArticleRight from "./ArticleRight";
import articles from "../../../db/articles.json";

export default function Articles() {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0">
      <h3 className="border-b-2 w-fit mx-auto border-white border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
        جدیدترین مقالات
      </h3>
      <section className="grid sm:grid-cols-2 gap-5 mt-10">
        <ArticleRight allArticles={articles} />
        <article className="grid grid-rows-3 justify-center gap-5">
          {articles.map(
            (article) =>
              article.id < 3 &&
              article.views && (
                <ArticleLeft key={article.id} article={article} />
              )
          )}
        </article>
      </section>
    </div>
  );
}
