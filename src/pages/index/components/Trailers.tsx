import TrailerBottom from "./TrailerBottom";
import TrailerTop from "./TrailerTop";

export default function Trailers() {
  return (
    <div className="pb-10 px-5 pt-5 xl:px-0 text-center">
      <h3 className="border-b-2 w-fit mx-auto border-white text-white pb-2 my-5">
        تریلر بازی ها
      </h3>
      <section className="w-full flex flex-col items-center gap-5">
        <TrailerTop />
        <article className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-center">
          <TrailerBottom />
          <TrailerBottom />
          <TrailerBottom />
          <TrailerBottom />
        </article>
      </section>
      <button className="bg-white/20 rounded-lg text-white px-4 py-1 mt-8 text-xs font-semibold">
        مشاهده همه
      </button>
    </div>
  );
}
