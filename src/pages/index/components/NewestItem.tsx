import { IoIosAdd } from "react-icons/io";

export default function NewestItem() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gray-700 hover:scale-105 transition-all duration-300">
      <img
        className="w-full object-cover h-36"
        src="https://techcrunch.com/wp-content/uploads/2018/07/fortnite03.jpg"
      />
      <article className="px-3 bg-gradient-to-t from-orange-600/10 to-40% py-5">
        <h3 className="text-sm text-white font-semibold text-justify cursor-pointer">
          بازی Call Of Duty برای کنسول پلی استیشن 5
        </h3>
        <h4 className="text-xs text-center font-semibold text-orange-500 mt-3">
          قیمت 2/300 هزار تومان
        </h4>
      </article>
      <article className="grid grid-cols-2 *:w-full *:py-3">
        <button className="text-xs text-gray-300 font-semibold px-3 bg-gray-500/40 w-fit flex items-center gap-x-2 justify-center">
          سبد خرید
          <IoIosAdd className="w-5 h-5" />
        </button>
        <button className="text-xs font-semibold bg-orange-700/40 text-orange-300 flex items-center gap-x-2 justify-center">
          علاقمندی ها
          <IoIosAdd className="w-5 h-5" />
        </button>
      </article>
    </div>
  );
}
