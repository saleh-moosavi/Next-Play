import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="text-white flex justify-between p-5 lg:px-0 items-center lg:max-w-5xl lg:mx-auto">
      <ul className="flex gap-x-5 items-center *:text-sm font-semibold *:text-gray-200">
        <li>
          <FaGamepad className="w-7 h-7 text-purple-500" />
        </li>
        <li>خانه</li>
        <li>فروشگاه</li>
        <li>درباره ما</li>
        <li>تماس با ما</li>
        <li>وبلاگ</li>
      </ul>
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
