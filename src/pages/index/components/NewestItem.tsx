import { FaBookmark } from "react-icons/fa6";
import { GiBasket } from "react-icons/gi";

export default function NewestItem({ item }: any) {
  return (
    <div className="grid items-center rounded-2xl overflow-hidden bg-gray-700 dark:bg-gray-300 hover:scale-105 transition-all duration-700">
      <img className="w-full object-cover h-52 sm:h-36" src={item.img} />
      <h3 className="text-sm text-white dark:text-gray-900 font-semibold text-center sm:text-justify cursor-pointer mt-5 self-start px-2">
        {item.title}
      </h3>
      <h4 className="text-xs text-center font-semibold text-orange-400 dark:text-orange-600 mt-3 mb-5 self-end">
        {item.price.toLocaleString()} هزار تومان
      </h4>
      <article className="grid grid-cols-2 *:w-full *:py-3 self-end">
        <button className="text-xs text-gray-300 dark:text-gray-100 font-semibold px-3 bg-black/10 dark:bg-black/50 w-fit flex items-center gap-x-2 justify-center">
          سبد خرید
          <GiBasket className="w-3 h-3" />
        </button>
        <button className="text-xs font-semibold bg-orange-600/60 text-orange-300 dark:bg-orange-600/70 dark:text-orange-200 flex items-center gap-x-2 justify-center">
          علاقمندی ها
          <FaBookmark className="w-3 h-3" />
        </button>
      </article>
    </div>
  );
}
