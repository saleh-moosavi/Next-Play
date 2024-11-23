import { FaGamepad, FaMoon, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="text-white flex justify-between p-5 items-center xl:max-w-5xl xl:mx-auto">
      <ul className="flex gap-x-5 items-center">
        <li>
          <FaGamepad className="w-7 h-7 text-fuchsia-500"/>
        </li>
        <li>خانه</li>
        <li>فروشگاه</li>
        <li>درباره ما</li>
        <li>تماس با ما</li>
        <li>وبلاگ</li>
      </ul>
      <article className="flex gap-x-5 items-center">
        <FaSearch />
        <FaMoon />
        <button className="bg-fuchsia-500 px-5 py-1 rounded text-xs font-bold">ثبت نام</button>
      </article>
    </div>
  );
}
