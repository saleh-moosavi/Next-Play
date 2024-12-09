import NewestItem from "./NewestItem";
import items from "../../../db/newest.json";
import { useState } from "react";

export default function Newest() {
  const [data, setData] = useState(items);
  const [filter, setFilter] = useState("sale");

  const changeFilter = (e: any) => {
    setFilter(e.target.value);
    const newData = items.filter((item: any) => {
      return String(Object.keys(item)).includes(e.target.value);
    });
    setData(newData);
  };

  return (
    <div className="px-5 lg:px-0 my-10">
      <section className="flex justify-between items-center">
        <h2 className="font-semibold text-white dark:text-gray-900">
          جدیدترین بازی های فروشگاه
        </h2>
        <div className="px-5 bg-gray-600 rounded-lg">
          <select
            value={filter}
            onChange={changeFilter}
            className="*:text-white *:bg-gray-600 *:w-52 text-gray-300 text-xs py-2 bg-transparent border-none outline-none"
          >
            <option value="sale">پرفروش ترین</option>
            <option value="view">پربازدیدترین</option>
            <option value="rate">بالاترین امتیاز</option>
            <option value="download">بیشترین دانلود</option>
          </select>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5 py-5">
        {data.map(
          (item: any, index: any) =>
            index < 4 && <NewestItem key={item.id} item={item} />
        )}
      </section>
    </div>
  );
}
