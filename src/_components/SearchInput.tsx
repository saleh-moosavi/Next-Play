import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <label className="flex items-center relative overflow-hidden">
      <span className="flex justify-center items-center bg-white md:dark:bg-black p-2 md:p-1 h-full rounded-r-md">
        <CiSearch className="size-5 cursor-pointer text-black md:dark:text-white stroke-1" />
      </span>
      <input
        type="text"
        className="w-full h-full rounded-l-md bg-transparent border border-r-0 border-white md:dark:border-black text-white md:dark:text-gray-900 text-xs p-3 md:p-1 ps-2 outline-none"
      />
    </label>
  );
}
