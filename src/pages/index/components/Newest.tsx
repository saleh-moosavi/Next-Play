import NewestItem from "./NewestItem";

export default function Newest() {
  return (
    <div className="px-5 xl:px-0 my-10">
      <section className="flex justify-between items-center">
        <h2 className="font-semibold text-white">جدیدترین بازی های فروشگاه</h2>
        <div className="px-5 bg-gray-600 rounded-lg">
          <select className="*:text-white *:bg-gray-600 *:w-52 text-gray-300 text-xs py-2 bg-transparent border-none outline-none">
            <option value="sell">پرفروش ترین</option>
            <option value="view">پربازدیدترین</option>
            <option value="rate">بالاترین امتیاز</option>
            <option value="download">بیشترین دانلود</option>
          </select>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 py-5">
        <NewestItem />
        <NewestItem />
        <NewestItem />
        <NewestItem />
      </section>
    </div>
  );
}
