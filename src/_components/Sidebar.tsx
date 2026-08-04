import Link from "next/link";
import SearchInput from "./SearchInput";
import { PiList } from "react-icons/pi";
import { FaGamepad } from "react-icons/fa";
import { IoMdClose, IoMdMoon, IoMdSunny } from "react-icons/io";

export default function Sidebar({
  sidebar,
  sidebarChange,
  isDarkMode,
  toggleDarkMode,
  menuItems,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sidebar: boolean;
  sidebarChange: () => void;
  menuItems: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <>
      <nav className="flex md:hidden justify-between items-center text-white p-5 border-b border-gray-400/20 sticky top-0 z-50 backdrop-blur-2xl">
        <section className="md:hidden flex justify-between items-center w-full">
          <PiList
            className="size-6 hover:scale-110 transition-all duration-500 dark:text-gray-900 cursor-pointer"
            onClick={sidebarChange}
          />
          <Link href="/">
            <FaGamepad className="w-7 h-7 text-purple-500 dark:text-purple-700" />
          </Link>
        </section>
      </nav>
      <aside
        className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
          sidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={sidebarChange}
        />

        <div
          className={`absolute top-0 right-0 w-3/4 max-w-sm h-full bg-linear-to-b from-purple-600/95 to-purple-800/95 backdrop-blur-md shadow-2xl transition-all duration-500 ${
            sidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                aria-label="تم صفحه"
              >
                {isDarkMode ? (
                  <IoMdSunny className="text-yellow-500 w-6 h-6" />
                ) : (
                  <IoMdMoon className="text-stone-300 w-6 h-6" />
                )}
              </button>
              <button
                onClick={sidebarChange}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                aria-label="بستن منو"
              >
                <IoMdClose className="w-7 h-7 text-white hover:text-rose-400 hover:rotate-180 transition-all duration-500" />
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="transform transition-all duration-500"
                  style={{
                    transitionDelay: sidebar ? `${index * 50}ms` : "0ms",
                    opacity: sidebar ? 1 : 0,
                    transform: sidebar ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={sidebarChange}
                    className="block text-white text-lg font-medium hover:text-purple-200 hover:translate-x-2 transition-all duration-300 py-2 border-b border-white/10"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <SearchInput />
            </ul>

            <div className="mt-auto pt-6 border-t border-white/20">
              <Link
                href="/register"
                onClick={sidebarChange}
                className="block w-full text-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-all duration-300"
              >
                ثبت نام
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
