import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { PiList } from "react-icons/pi";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

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
      <div className="sm:hidden flex gap-x-5 *:cursor-pointer">
        <PiList
          className="size-6 hover:scale-110 transition-all duration-500"
          onClick={() => setSidebar(true)}
        />
        <FaGamepad className="w-7 h-7 text-purple-500" />
      </div>
      <article className="flex gap-x-5 items-center">
        <CiSearch />
        <IoMdMoon />
        <button className="bg-purple-500 px-5 py-1 rounded text-xs font-bold">
          ثبت نام
        </button>
      </article>

      {/* sidebar */}
      <div
        className={`sm:hidden fixed top-0 bottom-0 right-0 z-50 bg-black/30 backdrop-blur-sm w-full h-full transition-all duration-500 flex
          ${sidebar ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
      </div>
    </div>
  );
}
