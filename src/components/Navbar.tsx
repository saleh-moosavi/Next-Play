import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { PiList } from "react-icons/pi";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import darkmodStore from "../stateManager/darkmodStore";

export default function Navbar() {
  // zustand store
  const { isDarkMode, toggleDarkMode } = darkmodStore();

  // states
  const [sidebar, setSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(true);

  const sidebarChange = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="text-white flex justify-between items-center p-5 lg:px-0 lg:max-w-5xl lg:mx-auto">
      <ul className="hidden sm:flex sm:gap-x-5 sm:items-center *:text-sm font-semibold *:text-gray-200 *:cursor-pointer">
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
          onClick={sidebarChange}
        />
        <FaGamepad className="w-7 h-7 text-purple-500" />
      </div>
      <article className="flex gap-x-5 items-center">
        <label className="flex gap-x-5 items-center relative">
          <CiSearch
            className={`${searchbar ? "" : "absolute right-2"} cursor-pointer`}
            onClick={() => setSearchbar(!searchbar)}
          />
          <input
            type="text"
            className={`rounded-full bg-transparent border-[1px] text-xs pl-2 pr-7 py-1 outline-none transition-all duration-500
              ${searchbar ? "w-0 hidden" : "w-28 md:w-52"}`}
          />
        </label>
        <div onClick={toggleDarkMode} className="cursor-pointer">
          {isDarkMode ? <IoMdMoon /> : <IoMdSunny />}
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 px-5 py-1 rounded text-xs font-bold transition-all duration-500">
          ثبت نام
        </button>
      </article>

      {/* sidebar */}
      <div
        className={`sm:hidden fixed top-0 bottom-0 right-0 z-50 bg-black/30 backdrop-blur-sm w-full h-full transition-all duration-500 flex
          ${sidebar ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={sidebarChange}
      >
        <Sidebar sidebarChange={sidebarChange} sidebar={sidebar} />
      </div>
    </div>
  );
}
