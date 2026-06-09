import Link from "next/link";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import Button from "@/_components/Button";
import { MobileGame } from "@/types/mainPageTypes";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function MobileGames({
  mobileGames,
}: {
  mobileGames: MobileGame[];
}) {
  return (
    <div className="pb-10 px-5 pt-5 lg:px-0 text-center">
      <SectionTitle title="بازی های اندروید" />
      <section className="w-full flex flex-col items-center gap-5 my-10">
        <article className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 justify-items-center items-center">
          {mobileGames.map((game: MobileGame, index: number) => (
            <div
              key={"mobileGame" + index}
              className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 dark:bg-black/10 hover:bg-purple-500/20 group text-white transition-all duration-700"
            >
              <Image
                width={500}
                height={500}
                alt={game.title}
                className="w-full h-52 md:h-72 lg:h-52 object-cover group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700"
                src={game.iconUrl || "/alter-image.jpg"}
              />
              <p className="absolute top-2 right-2 flex items-center bg-black/60 px-2 py-[.1rem] text-xs font-semibold rounded-full select-none">
                {game.date}
              </p>
              <div className="flex flex-col gap-2 items-center justify-center p-5 *:text-xs *:text-gray-400 *:dark:text-gray-700">
                <Link
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-justify cursor-pointer dark:text-gray-900"
                >
                  {game.title}
                </Link>
                {/* Star Section */}
                <section className="flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-500 ml-1 order-2">
                    ({game.ratingPercent}%)
                  </span>
                  <div className="flex items-center gap-1 flex-row-reverse order-1">
                    {[...Array(5)].map((_, index) => {
                      const starValue = (index + 1) * 20;
                      const remainder = game.ratingPercent - index * 20;

                      if (game.ratingPercent >= starValue) {
                        return (
                          <FaStar
                            key={index}
                            className="w-4 h-4 text-yellow-400"
                          />
                        );
                      } else if (remainder > 0 && remainder < 20) {
                        return (
                          <FaStarHalfAlt
                            key={index}
                            className="w-4 h-4 text-yellow-400"
                          />
                        );
                      } else {
                        return (
                          <FaRegStar
                            key={index}
                            className="w-4 h-4 text-gray-400 dark:text-gray-600"
                          />
                        );
                      }
                    })}
                  </div>
                </section>
              </div>
            </div>
          ))}
        </article>
      </section>
      <Button rounded="md">مشاهده همه</Button>
    </div>
  );
}
