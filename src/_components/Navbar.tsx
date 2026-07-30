import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Navbar({
  searchbar,
  setSearchbar,
  isDarkMode,
  toggleDarkMode,
  menuItems,
}: {
  searchbar: boolean;
  setSearchbar: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  menuItems: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <nav className="hidden md:block text-white p-5 border-b border-gray-400/20 sticky top-0 z-50 backdrop-blur-2xl">
      <section className="flex justify-between items-center md:px-0 md:max-w-5xl md:mx-auto">
        <ul className="flex gap-x-5 items-center *:text-sm font-semibold *:text-gray-200 *:dark:text-gray-900 *:cursor-pointer">
          <li>
            <Link href={"/"}>
              <FaGamepad className="w-7 h-7 text-purple-500 dark:text-purple-700" />
            </Link>
          </li>
          {menuItems.map((menuItems, index) => (
            <li key={"nav item" + index}>
              <Link href={menuItems.href}>{menuItems.title}</Link>
            </li>
          ))}
        </ul>

        <article className="gap-x-5 items-center hidden md:flex">
          <label className="flex gap-x-5 items-center relative">
            <CiSearch
              className={`${
                searchbar ? "" : "absolute right-2"
              } cursor-pointer dark:text-gray-900`}
              onClick={() => setSearchbar(!searchbar)}
            />
            <input
              type="text"
              className={`rounded-full bg-transparent border dark:text-gray-900 dark:border-gray-900 text-xs pl-2 pr-7 py-1 outline-none transition-all duration-500
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
      </section>
    </nav>
  );
}
