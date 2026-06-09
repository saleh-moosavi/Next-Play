"use client";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { PiList } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { useEffect, useState } from "react";
import useDarkMode from "@/store/useDarkMode";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Navbar() {
  // zustand store
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
    <div className="text-white p-5 border-b border-gray-400/20 sticky top-0 z-50 backdrop-blur-2xl">
      <nav className="flex justify-between items-center lg:px-0 lg:max-w-5xl lg:mx-auto">
        <ul className="hidden sm:flex sm:gap-x-5 sm:items-center *:text-sm font-semibold *:text-gray-200 *:dark:text-gray-900 *:cursor-pointer">
          <li>
            <Link href={"/"}>
              <FaGamepad className="w-7 h-7 text-purple-500 dark:text-purple-700" />
            </Link>
          </li>
          <li>خانه</li>
          <li>فروشگاه</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
          <li>وبلاگ</li>
        </ul>
        <div className="sm:hidden flex gap-x-5 *:cursor-pointer">
          <PiList
            className="size-6 hover:scale-110 transition-all duration-500 dark:text-gray-900"
            onClick={sidebarChange}
          />
          <FaGamepad className="w-7 h-7 text-purple-500" />
        </div>
        <article className="flex gap-x-5 items-center">
          <label className="flex gap-x-5 items-center relative">
            <CiSearch
              className={`${
                searchbar ? "" : "absolute right-2"
              } cursor-pointer dark:text-gray-900`}
              onClick={() => setSearchbar(!searchbar)}
            />
            <input
              type="text"
              className={`rounded-full bg-transparent border-[1px] dark:text-gray-900 dark:border-gray-900 text-xs pl-2 pr-7 py-1 outline-none transition-all duration-500
            ${searchbar ? "w-0 hidden" : "w-28 md:w-52"}`}
            />
          </label>
          <div onClick={toggleDarkMode} className="cursor-pointer">
            {isDarkMode ? (
              <IoMdSunny className="text-yellow-500" />
            ) : (
              <IoMdMoon />
            )}
          </div>
          <Link
            href={"/register"}
            className="bg-purple-500 hover:bg-purple-600 px-5 py-1 rounded text-xs font-bold transition-all duration-500"
          >
            ثبت نام
          </Link>
        </article>

        {/* sidebar */}
        <div
          className={`sm:hidden fixed top-0 bottom-0 right-0 z-50 bg-black/30 backdrop-blur-sm w-full h-full transition-all duration-500 flex
        ${sidebar ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={sidebarChange}
        >
          <Sidebar sidebarChange={sidebarChange} sidebar={sidebar} />
        </div>
      </nav>
    </div>
  );
}
