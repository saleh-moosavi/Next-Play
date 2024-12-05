import { IoMdClose } from "react-icons/io";

export default function Sidebar({ sidebarChange, sidebar }: any) {
  return (
    <ul
      className={`flex flex-col gap-5 p-5 items-start rounded-2xl m-auto w-1/2 h-1/2 bg-purple-500/80 *:text-sm font-semibold transition-all duration-300 hover:*:text-orange-400 *:text-white *:cursor-pointer *:transition-all *:duration-500 
        ${sidebar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <li>
        <IoMdClose
          className="w-7 h-7 text-white hover:text-rose-400 hover:rotate-180 transition-all duration-500"
          onClick={sidebarChange}
        />
      </li>
      <li className="hover:-translate-x-2">خانه</li>
      <li className="hover:-translate-x-2">فروشگاه</li>
      <li className="hover:-translate-x-2">درباره ما</li>
      <li className="hover:-translate-x-2">تماس با ما</li>
      <li className="hover:-translate-x-2">وبلاگ</li>
    </ul>
  );
}
