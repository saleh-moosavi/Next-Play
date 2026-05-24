import TrailerTop from "./TrailerTop";
import { trailers } from "@/lib/fakeDB";
import Button from "@/_components/Button";
import TrailerBottom from "./TrailerBottom";
import { Video } from "@/types/mainPageTypes";

export default function Trailers({ videos }: { videos: Video[] }) {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0 text-center">
      <h3 className="border-b-2 w-fit mx-auto border-white dark:border-gray-900 text-white dark:text-gray-900 pb-2 my-5">
        تریلر بازی ها
      </h3>
      <section className="w-full flex flex-col items-center gap-5">
        <TrailerTop />
        <article className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center items-center">
          {trailers.map((item: any) => (
            <TrailerBottom key={item.id} data={item} />
          ))}
        </article>
      </section>
      <Button />
    </div>
  );
}
