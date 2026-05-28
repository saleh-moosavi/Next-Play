import Link from "next/link";
import Image from "next/image";
import { IranGameNews } from "@/types/mainPageTypes";

export default function NewsLeft({ news }: { news: IranGameNews[] }) {
  return (
    <article className="flex flex-col justify-between gap-2">
      {news.map((news: IranGameNews, index: number) => (
        <div
          key={"persian-news" + index}
          className="flex justify-start items-center gap-2 w-full bg-gray-700 dark:bg-gray-300 hover:bg-purple-900/40 transition-all duration-700 p-2 rounded-xl text-white group"
        >
          <div className="col-span-2 rounded-xl relative overflow-hidden">
            <div className="absolute w-14 h-14 border-2 border-white opacity-0 rounded-xl scale-110 group-hover:scale-75 group-hover:opacity-100 transition-all duration-700 z-50"></div>
            <Image
              width={500}
              height={500}
              alt={news.title}
              src={news.imageUrl}
              className="w-14 h-14 rounded-xl object-cover group-hover:grayscale transition-all duration-700 -z-10"
            />
          </div>
          <article className="col-span-3 flex flex-col items-start justify-between">
            <div className="flex gap-x-2 items-center *:text-[.7rem] *:font-semibold *:px-4 *:rounded-md *:bg-purple-500/20 *:dark:bg-purple-500/60 group-hover:*:bg-gray-400/20 group-hover:*:dark:bg-gray-300 text-purple-400 dark:text-purple-200  group-hover:*:dark:text-gray-500 *:transition-all *:duration-700">
              <p>{news.date}</p>
            </div>
            <Link
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold dark:text-gray-700 my-3 cursor-pointer text-justify"
            >
              {news.title}
            </Link>
          </article>
        </div>
      ))}
    </article>
  );
}
