import ArticleLeft from "./ArticleLeft";
import ArticleRight from "./ArticleRight";

export default function Articles() {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0">
      <h3 className="border-b-2 w-fit mx-auto border-white text-white pb-2 my-5">
        جدیدترین مقالات
      </h3>
      <section className="grid grid-cols-2 gap-5 mt-10">
        <ArticleRight />
        <article className="grid grid-rows-3 justify-center gap-5">
          <ArticleLeft />
          <ArticleLeft />
          <ArticleLeft />
        </article>
      </section>
    </div>
  );
}
