import Link from "next/link";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import Button from "@/_components/Button";
import { Video } from "@/types/mainPageTypes";

export default function Videos({ videos }: { videos: Video[] }) {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0 text-center">
      <SectionTitle title="راهنمای آموزشی" />
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 my-10">
        {videos.map((video: Video, index: number) => {
          let spanClass = "";
          if (index >= 0 && index <= 2) {
            spanClass = "md:col-span-4";
          } else {
            spanClass = "md:col-span-6";
          }

          return (
            <div
              key={"video" + index}
              className={`relative w-full h-52 rounded-2xl overflow-hidden cursor-pointer group ${spanClass}`}
            >
              <Image
                width={500}
                height={500}
                alt={video.title}
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-700"
                src={video.imageUrl || "/alter-image.jpg"}
              />
              <div className="absolute p-2 w-full bottom-0 top-0 flex flex-col justify-center items-center text-white text-center group-hover:bg-black/40 transition-all duration-700">
                <Link
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold line-clamp-2 px-2"
                >
                  {video.title}
                </Link>
                <p className="text-xs mt-1">{video.duration}</p>
              </div>
            </div>
          );
        })}
      </section>
      <Button rounded="md">مشاهده همه</Button>
    </div>
  );
}
