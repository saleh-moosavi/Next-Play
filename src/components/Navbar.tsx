import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { PiList } from "react-icons/pi";

export default function Navbar() {
  return (
    <div className="text-white flex justify-between items-center p-5 lg:px-0 lg:max-w-5xl lg:mx-auto">
      <ul className="hidden sm:flex sm:gap-x-5 sm:items-center *:text-sm font-semibold *:text-gray-200">
        <li>
          <FaGamepad className="w-7 h-7 text-purple-500" />
        </li>
        <li>خانه</li>
        <li>فروشگاه</li>
        <li>درباره ما</li>
        <li>تماس با ما</li>
        <li>وبلاگ</li>
      </ul>
      <PiList className="sm:hidden size-6 cursor-pointer hover:scale-110 transition-all duration-500" />
      <article className="flex gap-x-5 items-center">
        <CiSearch />
        <IoMdMoon />
        <button className="bg-purple-500 px-5 py-1 rounded text-xs font-bold">
          ثبت نام
        </button>
      </article>
    </div>
  );
}
