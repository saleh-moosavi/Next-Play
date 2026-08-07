import { useRef } from "react";
import Router from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = inputRef.current?.value.trim() ?? "";

    if (text.length < 3) return;

    Router.redirect(`/search?text=${encodeURIComponent(text)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center relative overflow-hidden"
    >
      <button
        type="submit"
        className="flex justify-center items-center bg-white md:dark:bg-black p-2 md:p-1 h-full cursor-pointer rounded-r-md"
      >
        <CiSearch className="size-5 text-black md:dark:text-white stroke-1" />
      </button>
      <input
        ref={inputRef}
        type="text"
        className="w-full h-full rounded-l-md bg-transparent border border-r-0 border-white md:dark:border-black text-white md:dark:text-gray-900 text-xs p-3 md:p-1 ps-2 outline-none"
      />
    </form>
  );
}
