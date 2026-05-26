import Link from "next/link";
import Image from "next/image";
import { News } from "@/types/mainPageTypes";

export default function ArticleLeft({ article }: { article: News }) {
  return (
    <div className="grid grid-cols-5 w-full gap-x-2 items-center bg-gray-700 dark:bg-gray-300 hover:bg-purple-900/40 transition-all duration-700 p-2 rounded-xl text-white group">
      <div className="h-32 col-span-2 rounded-xl relative overflow-hidden">
        <div className="absolute w-full h-full border-2 border-white opacity-0 rounded-xl scale-110 group-hover:scale-75 group-hover:opacity-100 transition-all duration-700 z-50"></div>
        <Image
          width={500}
          height={500}
          alt={article.title}
          src={article.imageUrl}
          className="w-full h-full rounded-xl object-cover group-hover:grayscale transition-all duration-700 -z-10"
        />
      </div>
      <article className="col-span-3 flex flex-col items-start justify-between h-full">
        <div className="flex gap-x-2 items-center *:text-[.7rem] *:font-semibold *:px-4 *:rounded-md *:bg-purple-500/20 *:dark:bg-purple-500/60 group-hover:*:bg-gray-400/20 group-hover:*:dark:bg-gray-300 text-purple-400 dark:text-purple-200  group-hover:*:dark:text-gray-500 *:transition-all *:duration-700">
          <p>{article.date}</p>
        </div>
        <h3 className="text-xs font-semibold dark:text-gray-700 my-3 cursor-pointer text-justify">
          {article.title}
        </h3>

        <Link
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[.6rem] font-semibold bg-gray-800 dark:bg-gray-500 group-hover:bg-purple-600 transition-all duration-700 px-4 py-1 rounded-md mt-1"
        >
          بیشتر بدانید
        </Link>
      </article>
    </div>
  );
}
