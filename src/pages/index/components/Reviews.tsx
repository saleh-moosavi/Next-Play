import ReviewItem from "./ReviewItem";

export default function Reviews() {
  return (
    <div className="pb-10 px-5 pt-10 xl:px-0 text-center">
      <h3 className="border-b-2 w-fit mx-auto border-white text-white pb-2 my-5">
        نقد و بررسی ها
      </h3>
      <section className="grid grid-cols-3 items-center justify-items-center gap-5 mt-10">
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </section>
      <button className="bg-white/20 rounded-lg text-white px-4 py-1 mt-8 text-xs font-semibold">
        مشاهده همه
      </button>
    </div>
  );
}
